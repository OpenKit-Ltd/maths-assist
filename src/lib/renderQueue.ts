// src/lib/renderQueue.ts
interface RenderTask {
  id: string;
  tikzCode: string;
  priority: number;
  onComplete?: (url: string) => void;
  onError?: (error: string) => void;
}

interface CompileResponse {
  error?: string;
  details?: string;
}

// Global cache to store compiled TikZ diagrams
export const tikzCache: Map<string, string> = new Map();

class RenderQueueService {
  private queue: RenderTask[] = [];
  private processing: boolean = false;
  private MAX_CONCURRENT_RENDERS: number = 2; // Adjust based on server capacity
  private activeRenders: number = 0;
  private pendingCallbacks: Map<string, RenderTask> = new Map(); // Track tasks with pending callbacks

  // Add a render task to the queue
  addToQueue(task: RenderTask): void {
    // Check if already in cache
    if (tikzCache.has(task.tikzCode)) {
      const cachedUrl = tikzCache.get(task.tikzCode);
      if (cachedUrl && task.onComplete) {
        // Use setTimeout to mimic async behavior and not block the main thread
        console.log(
          `Task ${task.id} found in cache, triggering completion callback`
        );
        setTimeout(() => {
          if (task.onComplete) task.onComplete(cachedUrl);
        }, 0);
      }
      return;
    }

    // Check if already in queue to avoid duplicates
    const existingTaskIndex = this.queue.findIndex(
      (t) => t.tikzCode === task.tikzCode
    );
    if (existingTaskIndex >= 0) {
      // If found and new task has higher priority, replace it
      if (task.priority < this.queue[existingTaskIndex].priority) {
        console.log(
          `Task ${task.id} is replacing existing task in queue with lower priority`
        );
        // Save callbacks from both tasks
        const existingTask = this.queue[existingTaskIndex];
        this.queue[existingTaskIndex] = task;

        // Register this task for callback when the render completes
        this.pendingCallbacks.set(task.tikzCode, task);

        // If existing task had callbacks, also register them
        if (existingTask.onComplete || existingTask.onError) {
          this.pendingCallbacks.set(`${task.tikzCode}-existing`, existingTask);
        }

        // Re-sort the queue
        this.sortQueue();
      } else {
        // Still register for callback even if not replacing
        console.log(`Task ${task.id} is waiting on an already queued render`);
        this.pendingCallbacks.set(`${task.tikzCode}-${task.id}`, task);
      }
      return;
    }

    // Add new task to queue
    console.log(
      `Task ${task.id} added to queue with priority ${task.priority}`
    );
    this.queue.push(task);
    this.sortQueue();

    // Start processing if not already started
    if (!this.processing) {
      console.log("Starting queue processing");
      this.processQueue();
    }
  }

  // Sort queue by priority (lower number = higher priority)
  private sortQueue(): void {
    this.queue.sort((a, b) => a.priority - b.priority);
  }

  // Process the queue
  private async processQueue(): Promise<void> {
    if (
      this.queue.length === 0 ||
      this.activeRenders >= this.MAX_CONCURRENT_RENDERS
    ) {
      if (this.queue.length === 0 && this.activeRenders === 0) {
        console.log("Queue processing complete");
        this.processing = false;
      }
      return;
    }

    this.processing = true;
    this.activeRenders++;

    const task = this.queue.shift();
    if (!task) {
      this.activeRenders--;
      this.processQueue();
      return;
    }

    // Store the current task for callback
    this.pendingCallbacks.set(task.tikzCode, task);

    console.log(`Processing task ${task.id} with priority ${task.priority}`);

    try {
      const url = await this.compileTikz(task.tikzCode);

      // Execute callback for original task
      if (task.onComplete) {
        console.log(`Executing completion callback for task ${task.id}`);
        task.onComplete(url);
      }

      // Execute all pending callbacks for this tikzCode
      this.executePendingCallbacks(task.tikzCode, url);
    } catch (error) {
      console.error(`Error rendering task ${task.id}:`, error);
      if (task.onError) {
        task.onError(error instanceof Error ? error.message : String(error));
      }

      // Execute error callbacks for all pending tasks
      this.executePendingErrorCallbacks(
        task.tikzCode,
        error instanceof Error ? error.message : String(error)
      );
    } finally {
      this.activeRenders--;
      // Continue processing the queue
      this.processQueue();

      // Start another concurrent render if possible
      if (
        this.activeRenders < this.MAX_CONCURRENT_RENDERS &&
        this.queue.length > 0
      ) {
        this.processQueue();
      }
    }
  }

  // Execute all pending callbacks for a tikzCode
  private executePendingCallbacks(tikzCode: string, url: string): void {
    // Find all callbacks for this tikzCode
    for (const [key, pendingTask] of this.pendingCallbacks.entries()) {
      if (key === tikzCode || key.startsWith(`${tikzCode}-`)) {
        if (pendingTask.onComplete) {
          console.log(`Executing pending callback for ${key}`);
          pendingTask.onComplete(url);
        }
        // Remove from pending
        this.pendingCallbacks.delete(key);
      }
    }
  }

  // Execute all pending error callbacks for a tikzCode
  private executePendingErrorCallbacks(
    tikzCode: string,
    errorMessage: string
  ): void {
    // Find all callbacks for this tikzCode
    for (const [key, pendingTask] of this.pendingCallbacks.entries()) {
      if (key === tikzCode || key.startsWith(`${tikzCode}-`)) {
        if (pendingTask.onError) {
          console.log(`Executing pending error callback for ${key}`);
          pendingTask.onError(errorMessage);
        }
        // Remove from pending
        this.pendingCallbacks.delete(key);
      }
    }
  }

  // Compile TikZ code
  private async compileTikz(tikzCode: string): Promise<string> {
    // First check if already in cache
    const cachedUrl = tikzCache.get(tikzCode);
    if (cachedUrl) {
      console.log(`Found cached render for ${tikzCode.substring(0, 20)}...`);
      return cachedUrl;
    }

    console.log(`Compiling code: ${tikzCode.substring(0, 20)}...`);
    const response = await fetch("http://localhost:5000/compile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tikz_code: tikzCode,
        format: "png", // Request PNG format
      }),
    });

    if (!response.ok) {
      const errorData: CompileResponse = await response.json();
      throw new Error(errorData.details || "Failed to compile TikZ code");
    }

    // Get the PNG blob
    const imageBlob: Blob = await response.blob();

    // Create a URL for the image blob
    const url: string = URL.createObjectURL(imageBlob);

    // Add to cache for future use
    console.log(`Caching render for ${tikzCode.substring(0, 20)}...`);
    tikzCache.set(tikzCode, url);

    return url;
  }

  // Clear all pending tasks
  clearQueue(): void {
    console.log("Clearing render queue");
    this.queue = [];
    this.pendingCallbacks.clear();
  }

  // Get current queue length
  getQueueLength(): number {
    return this.queue.length;
  }
}

// Export a singleton instance
export const renderQueue = new RenderQueueService();
