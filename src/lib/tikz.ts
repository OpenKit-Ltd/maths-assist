export const TikzExamples = `# Long Division:
\`\`\`latex
\documentclass{article}
\pagestyle{empty}
\\usepackage{geometry}
\geometry{margin=0.1cm}
\\usepackage{tikz}
\\usepackage{amsmath}

\begin{document}

\begin{center}
$\begin{tabular}{r@{}l@{}c@{}c@{}c@{}c@{}c@{}l@{}c@{}}
  &        & & & &  && \\
  &        & &.&1&8 & &  \\ \cline{2-7} \\ [-12.3pt]
   11&\big )&2&.&0&0&0& \\ 
  &             &1&  1& & & &  \\ \cline{3-5} 
  &             & &9&0& & &  \\ 
  &             & &8&8& & &     \\ \cline{4-6} 
  &             & & &2&0& &  \\ 
  &             & & &1&1& & \\ \cline{5-6} 
  &             & & & &9& &
 \end{tabular}$
 \end{center}

 \end{document}
\`\`\`

# Drawing Angles:
\`\`\`latex
% Drawing angles using the PG 3.0 angles and quotes libraries
% Author: Paul Gaborit
\documentclass{article}
\pagestyle{empty}
\\usepackage{tikz}
\\usepackage{geometry}
\geometry{margin=0.1cm}
\\usetikzlibrary{quotes,angles}
\begin{document}
\begin{tikzpicture}
  \draw
    (3,-1) coordinate (a) node[right] {a}
    -- (0,0) coordinate (b) node[left] {b}
    -- (2,2) coordinate (c) node[above right] {c}
    pic["$\alpha$", draw=orange, <->, angle eccentricity=1.2, angle radius=1cm]
    {angle=a--b--c};
\end{tikzpicture}
\end{document}
\`\`\`

# Pythagorean triangle with the squares of its sides and labels:
\`\`\`latex
\documentclass{article}
\pagestyle{empty}
\\usepackage{tikz}
\\usepackage{geometry}
\geometry{margin=0.1cm}
\begin{document}
\newcommand{\pythagwidth}{3cm}
\newcommand{\pythagheight}{2cm}
\begin{tikzpicture}
  \coordinate [label={below right:$A$}] (A) at (0, 0);
  \coordinate [label={above right:$B$}] (B) at (0, \pythagheight);
  \coordinate [label={below left:$C$}] (C) at (-\pythagwidth, 0);

  \coordinate (D1) at (-\pythagheight, \pythagheight + \pythagwidth);
  \coordinate (D2) at (-\pythagheight - \pythagwidth, \pythagwidth);

  \draw [very thick] (A) -- (C) -- (B) -- (A);

  \newcommand{\ranglesize}{0.3cm}
  \draw (A) -- ++ (0, \ranglesize) -- ++ (-\ranglesize, 0) -- ++ (0, -\ranglesize);

  \draw [dashed] (A) -- node [below] {$b$} ++ (-\pythagwidth, 0)
            -- node [right] {$b$} ++ (0, -\pythagwidth)
            -- node [above] {$b$} ++ (\pythagwidth, 0)
            -- node [left]  {$b$} ++ (0, \pythagwidth);

  \draw [dashed] (A) -- node [right] {$c$} ++ (0, \pythagheight)
            -- node [below] {$c$} ++ (\pythagheight, 0)
            -- node [left]  {$c$} ++ (0, -\pythagheight)
            -- node [above] {$c$} ++ (-\pythagheight, 0);

  \draw [dashed] (C) -- node [above left]  {$a$} (B)
                     -- node [below left]  {$a$} (D1)
                     -- node [below right] {$a$} (D2)
                     -- node [above right] {$a$} (C);
\end{tikzpicture}
\end{document}
\`\`\`

# Perpendicular bisectors of a triangle:
\`\`\`latex
% Perpendicular bisectors of a triangle
% Author: Sam Britt
\documentclass{article}
\pagestyle{empty}
\\usepackage{tikz}
\\usepackage{geometry}
\geometry{margin=0.1cm}
\\usetikzlibrary{calc}
\begin{document}
\begin{tikzpicture}
  [
    scale=3,
    >=stealth,
    point/.style = {draw, circle,  fill = black, inner sep = 1pt},
    dot/.style   = {draw, circle,  fill = black, inner sep = .2pt},
  ]

  % the circle
  \def\rad{1}
  \node (origin) at (0,0) [point, label = {below right:$P_c$}]{};
  \draw (origin) circle (\rad);

  % triangle nodes: just points on the circle
  \node (n1) at +(60:\rad) [point, label = above:$1$] {};
  \node (n2) at +(-145:\rad) [point, label = below:$2$] {};
  \node (n3) at +(-45:\rad) [point, label = {below right:$3$ $(0, 0, 0)$}] {};

  % triangle edges: connect the vertices, and leave a node at the midpoint
  \draw[->] (n3) -- node (a) [label = {above right:$\vec{v}_1$}] {} (n1);
  \draw[->] (n3) -- node (b) [label = {below right:$\vec{v}_2$}] {} (n2);
  \draw[dashed] (n2) -- (n1);

  % Bisectors
  % start at the point lying on the line from (origin) to (a), at
  % twice that distance, and then draw a path going to the point on
  % the line lying on the line from (a) to the (origin), at 3 times
  % that distance.
  \draw[dotted]
    ($ (origin) ! 2 ! (a) $)
    node [right] {Bisector 1}
    -- ($(a) ! 3 ! (origin)$ );

  % similarly for origin and b
  \draw[dotted]
    ($ (origin) ! 2 ! (b) $)
    -- ($(b) ! 3 ! (origin)$ )
    node [right] {Bisector 2};

  % short vectors
  \draw[->]
    ($ (origin) ! -.7 ! (a) $)
    -- node [below] {$\vec{u}_4$}
    ($ (origin) ! -.1 ! (a) $);
  \draw[->]
    ($ (origin) ! -.1 ! (b) $)
    -- node [right] {$\vec{u}_3$}
    ($ (origin) ! -.7 ! (b) $);

  % Right angle symbols
  \def\ralen{.5ex}  % length of the short segment
  \foreach \inter/\first/\last in {a/n3/origin, b/n2/origin}
    {
      \draw let \p1 = ($(\inter)!\ralen!(\first)$), % point along first path
                \p2 = ($(\inter)!\ralen!(\last)$),  % point along second path
                \p3 = ($(\p1)+(\p2)-(\inter)$)      % corner point
            in
              (\p1) -- (\p3) -- (\p2)               % path
              ($(\inter)!.5!(\p3)$) node [dot] {};  % center dot
    }
\end{tikzpicture}
\end{document}
\`\`\`

# Scheme of Greatest Common Divisor (GCD):
\`\`\`latex
% Scheme of Greatest Common Divisor
% Author: Giuseppe (joematara@hotmail.com)
\documentclass{article}
\pagestyle{empty}
\\usepackage{tikz}	
\\usepackage{geometry}
\geometry{margin=0.1cm}
\\usepackage[active,tightpage]{preview}
\PreviewEnvironment{tikzpicture}
\setlength{\PreviewBorder}{10pt}%
\begin{document}
\begin{tikzpicture}[set style={{help lines}+=[dashed]}]
\draw[style=help lines] (0,0) grid +(12,12);
\draw                   (4,11) grid +(1,1);
\draw                   (6,10) grid +(1,1);
\draw                   (4,10) grid +(1,1); 
%-----
\draw                   (4,9) grid +(1,1);
\draw                   (6,9) grid +(1,1);
%-----
\draw                   (6,8) grid +(1,1);
\draw                   (4,8) grid +(1,1);
%
\draw                   (4,7) grid +(1,1);
\draw                   (6,7) grid +(1,1);
%
\draw                   (6,6) grid +(1,1);
\draw                   (4,6) grid +(1,1);
%
\draw                   (4,5) grid +(1,1);
\draw                   (6,5) grid +(1,1);
%
\draw                   (6,4) grid +(1,1);
\draw                   (4,4) grid +(1,1);
%
\draw                   (4,3) grid +(1,1);
\draw                   (6,3) grid +(1,1);

%------------------------------------------------------
% red1
\draw   [red,very thick,->]   (5,11.2) -- (6,10.8);
  \draw   [red,thick, ->]   (5.25,10.5) -- (5,10.5); 
  \draw   [red,thick, ->]   (6,10.5) -- (5.75,10.5);
\draw   (5.5,10.5) circle (0.2);
  \draw   [red,thick, ->]   (4.5,10.2) -- (4.5,9.8);
% blue1
\draw   [blue,very thick,->]   (6,10.2) -- (5,9.8);
  \draw   [blue,thick,->]   (5.75,9.5) -- (6,9.5); 
  \draw   [blue,thick,->]   (5,9.5) -- (5.25,9.5);
\draw   (5.5,9.5) circle (0.2); 
  \draw   [blue,thick, ->]   (6.5,9.2) -- (6.5,8.8);
%-----------------  
% red2
\draw   [red,very thick,->]   (5,9.2) -- (6,8.8);
  \draw   [red,thick, ->]   (5.25,8.5) -- (5,8.5); 
  \draw   [red,thick, ->]   (6,8.5) -- (5.75,8.5);
\draw   (5.5,8.5) circle (0.2);
  \draw   [red,thick, ->]   (4.5,8.2) -- (4.5,7.8);
% blue2
\draw   [blue,very thick,->]   (6,8.2) -- (5,7.8);
  \draw   [blue,thick,->]   (5.75,7.5) -- (6,7.5); 
  \draw   [blue,thick,->]   (5,7.5) -- (5.25,7.5);
\draw   (5.5,7.5) circle (0.2); 
  \draw   [blue,thick, ->]   (6.5,7.2) -- (6.5,6.8);
%-----------------  
% red3
\draw   [red,very thick,->]   (5,7.2) -- (6,6.8);
  \draw   [red,thick, ->]   (5.25,6.5) -- (5,6.5); 
  \draw   [red,thick, ->]   (6,6.5) -- (5.75,6.5);
\draw   (5.5,6.5) circle (0.2);
  \draw   [red,thick, ->]   (4.5,6.2) -- (4.5,5.8);

% -------- Fill numbers -----------
\node  at  (4.5,11.5) {2993};
\node  at  (6.5,10.5) {1095};
\node  at  (5.5,10.5) {2};  
\node  at  (4.5,10.5) {2190}; 
%---
\node  at  (6.5,9.5) {803}; 
\node  at  (5.5,9.5) {1}; 
\node  at  (4.5,9.5) {803};
%---
\node  at  (6.5,8.5) {292};
\node  at  (5.5,8.5) {2}; 
\node  at  (4.5,8.5) {584};
%
\node  at  (4.5,7.5) {219};
\node  at  (5.5,7.5) {1};
\node  at  (6.5,7.5) {219};
%---
\node  at  (6.5,6.5) {73};
\node  at  (5.5,6.5) {3};
\node  at  (4.5,6.5) {219};
%
\node  at  (4.5,5.5) {0};
\end{tikzpicture}
\end{document}
\`\`\`

# Set operations illustrated with Venn diagrams:
\`\`\`latex
\documentclass{article}
\pagestyle{empty}
\\usepackage{tikz}
\\usepackage{geometry}
\geometry{margin=0.1cm}
% Set operations illustrated with Venn diagrams
% Author: Uwe Ziegenhagen
% This is an expanded version of an example provided by T. Tantau

\\usepackage[active,tightpage]{preview}
\PreviewEnvironment{tikzpicture}
\setlength\PreviewBorder{5pt}%


\begin{document}

% Definition of circles
\def\firstcircle{(0,0) circle (1.5cm)}
\def\secondcircle{(0:2cm) circle (1.5cm)}

\colorlet{circle edge}{blue!50}
\colorlet{circle area}{blue!20}

\tikzset{filled/.style={fill=circle area, draw=circle edge, thick},
    outline/.style={draw=circle edge, thick}}

\setlength{\parskip}{5mm}
% Set A and B
\begin{tikzpicture}
    \begin{scope}
        \clip \firstcircle;
        \fill[filled] \secondcircle;
    \end{scope}
    \draw[outline] \firstcircle node {$A$};
    \draw[outline] \secondcircle node {$B$};
    \node[anchor=south] at (current bounding box.north) {$A \cap B$};
\end{tikzpicture}

%Set A or B but not (A and B) also known a A xor B
\begin{tikzpicture}
    \draw[filled, even odd rule] \firstcircle node {$A$}
                                 \secondcircle node{$B$};
    \node[anchor=south] at (current bounding box.north) {$\overline{A \cap B}$};
\end{tikzpicture}

% Set A or B
\begin{tikzpicture}
    \draw[filled] \firstcircle node {$A$}
                  \secondcircle node {$B$};
    \node[anchor=south] at (current bounding box.north) {$A \cup B$};
\end{tikzpicture}

% Set A but not B
\begin{tikzpicture}
    \begin{scope}
        \clip \firstcircle;
        \draw[filled, even odd rule] \firstcircle node {$A$}
                                     \secondcircle;
    \end{scope}
    \draw[outline] \firstcircle
                   \secondcircle node {$B$};
    \node[anchor=south] at (current bounding box.north) {$A - B$};
\end{tikzpicture}

% Set B but not A
\begin{tikzpicture}
    \begin{scope}
        \clip \secondcircle;
        \draw[filled, even odd rule] \firstcircle
                                     \secondcircle node {$B$};
    \end{scope}
    \draw[outline] \firstcircle node {$A$}
                   \secondcircle;
    \node[anchor=south] at (current bounding box.north) {$B - A$};
\end{tikzpicture}

\end{document}
\`\`\`

# Regular polygons:
\`\`\`latex
% Regular polygons
\documentclass{article}
\pagestyle{empty}
\\usepackage{tikz}
\\usepackage{geometry}
\geometry{margin=0.1cm}


\begin{document}

% Radius of regular polygons
\newdimen\R
\R=0.8cm

\begin{tikzpicture}
    % Indicate the boundary of the regular polygons
    \draw [thin,black!20] circle (\R) ;
    \fill[black!20] circle (2pt);
    \draw (0:\R) \foreach \\x in {120,240} {
            -- (\\x:\R)
        } -- cycle (90:\R) node[above] {$n=3$} ;
    \draw[xshift=2.5\R] (0:\R) \foreach \\x in {90,180,...,359} {
            -- (\\x:\R)
        } -- cycle (90:\R) node[above] {$n=4$} ;
    \draw[xshift=5.0\R] (0:\R) \foreach \\x in {72,144,...,359} {
            -- (\\x:\R)
        } -- cycle (90:\R) node[above] {$n=5$} ;
    \begin{scope}[yshift=-3\R]
        \draw (0:\R) \foreach \\x in {60,120,...,359} {
                -- (\\x:\R)
            }-- cycle (90:\R) node[above] {$n=6$} ;
            
        % 360/7 = 51.4286 For PGF v < 1.18 we have to round to the nearest
        % integer. Newer version support fractional angle values.
        % For a more accurate result use the sequence
        % {51, 103, 154, 206, 257, 309}
        %
        \draw[xshift=2.5\R] (0:\R) \foreach \\x in {51.4286,102.8571,...,359} {
                -- (\\x:\R)
            }-- cycle (90:\R) node[above] {$n=7$} ;
        \draw[xshift=5.0\R] (0:\R) \foreach \\x in {45,90,...,359} {
                -- (\\x:\R)
            } -- cycle (90:\R) node[above] {$n=8$} ;
    \end{scope}
    \draw[yshift=-6.0\R] (0:\R) \foreach \\x in {10,20,...,359} {
            -- (\\x:\R)
        } -- cycle (90:\R) node[above] {$n=36$} ;
\end{tikzpicture}

\end{document}
\`\`\`

# Probability tree:
\`\`\`latex
\documentclass{article}
\pagestyle{empty}
\\usepackage{tikz}
\\usepackage{geometry}
\geometry{margin=0.1cm}
\\usepackage[latin1]{inputenc}
\\usetikzlibrary{trees}


\begin{document}
\pagestyle{empty}


% Set the overall layout of the tree
\tikzstyle{level 1}=[level distance=3.5cm, sibling distance=3.5cm]
\tikzstyle{level 2}=[level distance=3.5cm, sibling distance=2cm]

% Define styles for bags and leafs
\tikzstyle{bag} = [text width=4em, text centered]
\tikzstyle{end} = [circle, minimum width=3pt,fill, inner sep=0pt]

% The sloped option gives rotated edge labels. Personally
% I find sloped labels a bit difficult to read. Remove the sloped options
% to get horizontal labels. 
\begin{tikzpicture}[grow=right, sloped]
\node[bag] {Bag 1 $4W, 3B$}
    child {
        node[bag] {Bag 2 $4W, 5B$}        
            child {
                node[end, label=right:
                    {$P(W_1\cap W_2)=\frac{4}{7}\cdot\frac{4}{9}$}] {}
                edge from parent
                node[above] {$W$}
                node[below]  {$\frac{4}{9}$}
            }
            child {
                node[end, label=right:
                    {$P(W_1\cap B_2)=\frac{4}{7}\cdot\frac{5}{9}$}] {}
                edge from parent
                node[above] {$B$}
                node[below]  {$\frac{5}{9}$}
            }
            edge from parent 
            node[above] {$W$}
            node[below]  {$\frac{4}{7}$}
    }
    child {
        node[bag] {Bag 2 $3W, 6B$}        
        child {
                node[end, label=right:
                    {$P(B_1\cap W_2)=\frac{3}{7}\cdot\frac{3}{9}$}] {}
                edge from parent
                node[above] {$B$}
                node[below]  {$\frac{3}{9}$}
            }
            child {
                node[end, label=right:
                    {$P(B_1\cap B_2)=\frac{3}{7}\cdot\frac{6}{9}$}] {}
                edge from parent
                node[above] {$W$}
                node[below]  {$\frac{6}{9}$}
            }
        edge from parent         
            node[above] {$B$}
            node[below]  {$\frac{3}{7}$}
    };
\end{tikzpicture}

\end{document}
\`\`\`

# Box and whisker plot:
\`\`\`latex
% Tukey plot
% Author: Sivaram Neelakantan
\documentclass{article}
\pagestyle{empty}
\\usepackage{tikz}
\\usepackage{geometry}
\geometry{margin=0.1cm}
\\usetikzlibrary{arrows,backgrounds,snakes}


\begin{document}

\begin{tikzpicture}[thick, framed]
    \filldraw[fill=green!20] (2,0) rectangle (5,1);% draw the box
    \draw (3,0) -- (3,1) node[above]{$\textsc{M}$};% draw the median
    \draw (5,0.5) -- (7,0.5);% draw right whisker
    \draw (2,0.5) -- (1,0.5);% draw left whisker
    \draw (7,0.39) -- (7,0.61);% draw vertical tab
    \draw (1,0.39) -- (1,0.61);% draw vertical tab
    \node[below] at (2,0) {$\textsc{Q1}$};% label the hinge
    \node[below] at (5,0) {$\textsc{Q3}$};% label the hinge
    \filldraw[ball color=red!80,shading=ball] (4,0.5) circle
        (0.06cm) node[above]{$\bar{x}$};% the mean
    \draw[<->] (2.3, -0.3) -- (4.7, -0.3)
        node[pos=0.5,below]{$\textsc{IQR}$}; % mark the IQR fences
    \draw[<->] (2, -0.8) -- (0,-0.8)
        node[pos=0.5,below]{$\textsc{1.5*IQR}$}; % left inner fence
    \draw[<->] (2,-1.4) -- (-2, -1.4)
        node[pos=0.5,below]{$\textsc{3*IQR}$};% left outer fence
    \draw[<->] (5, -0.8) -- (8,-0.8)
        node[midway,below]{$\textsc{1.5*IQR}$}; % right inner fence
    \draw[<->] (5,-1.4) -- (10, -1.4)
        node[pos=0.5,below]{$\textsc{3*IQR}$};% right outer fence
    %
    \node[below] at (9,0.7) {$\textbf{*}$}; % mild outlier on the right
    \node[below] at (-2.4,0.7) {$o$}; % extreme outlier on the left
    % Title
    \draw (3,2) node[above,xshift=0.7cm]{$ \textsc{Box and Whisker
        Plot}$};%
    % Axis
    \draw (-3,-2) -- (11,-2);
    % Note that the snaked line is drawn to 11.1 to force
    % TikZ to draw the final tick.
    \draw[snake=ticks,segment length=1cm] (-3,-2) -- (11.1,-2);
\end{tikzpicture}

\end{document}
\`\`\`

# Table:
\`\`\`latex
\documentclass{article}
\pagestyle{empty}
\\usepackage{tikz}
\\usepackage{geometry}
\geometry{margin=0.1cm}
\\usetikzlibrary{matrix}
\begin{document}

\tikzset{ 
    table/.style={
        matrix of nodes,
        row sep=-\pgflinewidth,
        column sep=-\pgflinewidth,
        nodes={
            rectangle,
            draw=black,
            align=center
        },
        minimum height=1.5em,
        text depth=0.5ex,
        text height=2ex,
        nodes in empty cells,
%%
        every even row/.style={
            nodes={fill=gray!20}
        },
        column 1/.style={
            nodes={text width=2em,font=\bfseries}
        },
        row 1/.style={
            nodes={
                fill=black,
                text=white,
                font=\bfseries
            }
        }
    }
}

\begin{tikzpicture}

\matrix (first) [table,text width=6em]
{
& Monday   & Tuesday & Wednesday & Thursday & Friday\\
1   & A & B & C & D & E \\
2   & F & G & H & J & K \\
3   & A & B & C & D & E \\
4   & F & G & H & J & K \\
};


\end{tikzpicture}
\end{document}
\`\`\`

# Chunking (long division):
\`\`\`latex
\documentclass{article}
\pagestyle{empty}
\\usepackage{tikz}
\\usepackage{amsmath}
\\usepackage{geometry}
\geometry{margin=0.1cm}
\\usepackage{array}

\begin{document}

\begin{align*}
\begin{array}{r r @{\hspace{0.8cm}} r @{\hspace{0.5cm}} l}
& & & \textbf{Chunks} \\
\cline{2-4}
\raisebox{0.5ex}{32} \vline & 835 & & \\
& -640 & & 20 \times 32 \\
\cline{2-2}
& 195 & & \\
& -160 & & 5 \times 32 \\
\cline{2-2}
& 35 & & \\
& -32 & & 1 \times 32 \\
\cline{2-2}
& 3 & & \\
\cline{2-2}
& & & \textbf{Total Chunks} = 20 + 5 + 1 = 26 \\
\end{array}
\end{align*}

\textbf{Answer:} Quotient = 26, Remainder = 3.

\end{document}
\`\`\`
`;
