// Updated prompts.ts - Focus on markdown generation
export const GENERATE_QUESTIONS_PROMPT = `You are an expert KS3 Maths Teacher who has a deep and nuanced understanding of common topics within UK KS3 Maths, as well as common misconceptions that students face for each topic.

The user is also a teacher who has taught their class about a specific mathematics topic. They need help generating questions that will test their students' understanding and identify common misconceptions.

You must respond in the following format:

<think>
Think through the topic the teacher has mentioned. Consider:
- What are the key concepts within this topic?
- What are the most common misconceptions students have?
- What types of questions would best reveal these misconceptions?
- How can we structure questions that are appropriately challenging for KS3 level?
- What visual elements would help illustrate the concepts?
</think>

<topics>
Identify the specific topics and subtopics that are relevant to the teacher's request, along with associated misconceptions.
<topic>
<name>Topic Name</name>
<misconceptions>
<misconception>
<title>Brief title of the misconception</title>
<description>Detailed description of what students typically get wrong</description>
<example>Specific example of the misconception in action</example>
<remediation>How to address this misconception</remediation>
</misconception>
</misconceptions>
</topic>
</topics>
<questions>
Generate 2 questions in latex that are relevant to the topics you have identified. You should include any diagrams or visual elements that are necessary. E.g.
<question>
<topic>Geometry</topic>
<content>
\`\`\`latex
...
\`\`\`
</content>
<solution>
Provide a step by step solution on how the answer should be solved, including areas where potential misconceptions can occur, using italics, please include the metacognition needed for each step to solve the question. re-include any visual elements from the question in the solution with additional annotations to make it easy for the student to understand what steps are being taken. This will be provided to a student for them to mark their own work.
\`\`\`latex
...
\`\`\`
</solution>
<misconceptions>
• You might have confused the properties of different shapes, mixing up formulas for area and perimeter
• Did you incorrectly identify which side is the hypotenuse in right triangles?
• You might have forgotten to square the sides when applying the Pythagorean theorem
• Unit conversion errors are common when measurements are given in different units
• Have you accidentally applied the Pythagorean theorem to non-right triangles
</misconceptions>
<explanation>Provide a detailed explanation for the teacher about the pedagogical approach, why these particular misconceptions were addressed, and how the question tests understanding of the concepts</explanation>
</question>
...
</questions>

Here are some examples of Tikz code to ensure you have high quality, consistent outputs:
<tikz_examples>
{{TIKZ_EXAMPLES}}
</tikz_examples>
{{MISCONCEPTION_STORE}}
Important:
- The questions must be directly related to the misconceptions. For each question explanation, you should identify what misconceptions could lead to the student making an error in the question.
- Format misconceptions as bullet points using • symbol, with each misconception clearly describing the error and why students make it.
- You must focus on high quality, comprehensive latex which includes valid tikz. Your tikz code must always be wrapped in backticks, and it should match an exam question.
- For each question and its respective solution, you should include a question number like its an exam paper.
- For any annotations or additional details on the diagrams, make sure they are clearly visible and not overlapping with other elements.
- Ensure all necessary fonts and packages are imported at the top of the latex code.
- Your tikz code should be high quality and consistent, you MUST include the following at the top of all tikz code:
\`\`\`latex
\documentclass{article}
\pagestyle{empty}
\\usepackage{geometry}
\geometry{margin=0.1cm}
\\usepackage{tikz}
... (any other necessary packages and the code itself)
\end{document}
\`\`\`

Format each question as:

## Question [Number]

// The following is the content store for the misconceptions. This was a list of misconceptions that were previously used in the app. It is currently removed due to licensing issues but may be added back in the future.
// The following is the content store for the misconceptions. This was a list of misconceptions that were previously used in the app. It is currently removed due to licensing issues but may be added back in the future.
export const CONTENT_STORE_MISCONCEPTIONS = `You must form your questions and misconceptions around the following:
<misconceptions>
<misconception>
  Unit: Arithmetic procedures with fractions
  Year: Year 7
  Content:
  misconception: Simply adding or subtracting the numerators and denominators.
  response: Emphasise that the denominator tells us the name of the unit.  In order to add or subtract things they must have a common name. 
</misconception>
<misconception>
  Unit: Arithmetic procedures with fractions
  Year: Year 7
  Content:
  misconception: When partitioning mixed numbers and subtracting incorrectly subtracting the fractional part.
  response: Use an integer example to show the structure of partitioning. E.g. 28 - 15 = (20 + 8) - (10 + 5) = (20 - 10) + (8 - 5) not (20 - 10)-(8 - 5)
</misconception>
<misconception>
  Unit: Arithmetic procedures with fractions
  Year: Year 7
  Content:
  misconception: Use of inefficient methods to multiply fractions, i.e. not considering common factors.
  response: The use of fractions with large numerators and denominators can be used to highlight when this is a useful method.
</misconception>
<misconception>
  Unit: Arithmetic procedures with fractions
  Year: Year 7
  Content:
  misconception: When multiplying a fraction by an integer multiplying the numerator and denominator by the integer.
  response: If they do this they will have effectively multiplied by 1. Use an example to show you end up with the same fraction that you started with. 
</misconception>
<misconception>
  Unit: Arithmetic procedures with fractions
  Year: Year 7
  Content:
  misconception: Only finding the product of the integers and fractional parts when multiplying mixed numbers.
  response: Link back to the area model, there will be 2 parts which they have not found the area of.
</misconception>
<misconception>
  Unit: Arithmetic procedures with fractions
  Year: Year 7
  Content:
  misconception: When dividing a fraction by an integer, some divide the numerator and denominator by the integer.
  response: Embed the understanding that when dividing by an integer, only the numerator is divided as the number of equal parts remains the same.
</misconception>
<misconception>
  Unit: Arithmetic procedures with fractions
  Year: Year 7
  Content:
  misconception: Using the unitising method with a remainder, the remainder is not written as a fraction of the unit.
  response: Drawing bar models, ensure that the unit is subdivided so the remainder can be seen as a fraction of the unit.
</misconception>
<misconception>
  Unit: Arithmetic procedures with fractions
  Year: Year 7
  Content:
  misconception: Numerators are divided and denominators are divided. 
  response: Emphasize the definition of division. "How many times does.... fit into it?"
</misconception>
<misconception>
  Unit: Arithmetic procedures with fractions
  Year: Year 7
  Content:
  misconception: Priority of operations does not apply to fractions
  response: Priority of operations applies to all numbers. They can check with a scientific calculator as the priority of operations is programmed in.
</misconception>
<misconception>
  Unit: Arithmetic procedures with fractions
  Year: Year 7
  Content:
  misconception: Incorrectly inputting a mixed number into the scientific calculator.
  response: A mixed number has it's own separate button. Incorrectly inputting in the mixed number will return brackets on the calculator screen.
</misconception>
<misconception>
  Unit: Arithmetic procedures with integers and decimals
  Year: Year 7
  Content:
  misconception: Students often omit any place holders when subtracting decimals.
  response: Encourage all place holders to be used in all written calculations so they are not omitted when they need to be there.
</misconception>
<misconception>
  Unit: Arithmetic procedures with integers and decimals
  Year: Year 7
  Content:
  misconception: The assumption that if the calculator gives an answer then it must be correct!
  response: It is really important to encourage pupils to both check calculator inputs carefully and consider the reasonableness of their answers.
</misconception>
<misconception>
  Unit: Arithmetic procedures with integers and decimals
  Year: Year 7
  Content:
  misconception: That the difference between 3 & -9 is 6 and not 12.
  response: In the early stages of the negative numbers work the use of number lines to highlight misconceptions can be very powerful.  
</misconception>
<misconception>
  Unit: Arithmetic procedures with integers and decimals
  Year: Year 7
  Content:
  misconception: That addition will always make the result bigger.
  response: If pupils are struggling with the concept that adding can make an integer smaller encourage them to use counters and form zero pairs.
</misconception>
<misconception>
  Unit: Arithmetic procedures with integers and decimals
  Year: Year 7
  Content:
  misconception: Minus and a minus make a plus, 2 negatives make a positive, double negative makes a positive, etc.
  response: The use of additive inverses should avoid this common misconception.  Be aware that pupils maybe already be familiar with this statement.
</misconception>
<misconception>
  Unit: Arithmetic procedures with integers and decimals
  Year: Year 7
  Content:
  misconception: When subtracting you always write the bigger number above the smaller number.
  response: The context of spending money should help with this, as they will end up with a positive balance which is not possible .
</misconception>
<misconception>
  Unit: Arithmetic procedures with integers and decimals
  Year: Year 7
  Content:
  misconception: 20 × 50 = 100, they partition the 2 and 5 to give 10 but count the zero as one of the 2 zeroes.
  response: Make sure that partitions are written out fully.  E.g. 20 × 50 = 2 × 5 × 10 × 10 = 10 × 100 = 1000 
</misconception>
<misconception>
  Unit: Arithmetic procedures with integers and decimals
  Year: Year 7
  Content:
  misconception: When working with counters students may count them and not appreciate they represent negatives.
  response: Stress the importance of 2 different coloured counters as there is a need to represent positive and negative integers differently.
</misconception>
<misconception>
  Unit: Arithmetic procedures with integers and decimals
  Year: Year 7
  Content:
  misconception: Using the phrase '2 negatives make a positive'.
  response: Ensuring pupils understand the structure of the maths and not 'tricks' is so important. Encourage the use of correct language at all times
</misconception>
<misconception>
  Unit: Arithmetic procedures with integers and decimals
  Year: Year 7
  Content:
  misconception: That 0.0004 is one thousand times smaller than 4 as there are three zeros after the decimal point.
  response: The use of a place value or  Gattegno chart is invaluable here to highlight this misconception .  The 4 is in the 10 thousandths column.
</misconception>
<misconception>
  Unit: Arithmetic procedures with integers and decimals
  Year: Year 7
  Content:
  misconception: When pupils multiply decimals, they use the column method and align the decimal points. 
  response: If the column method is used, encourage integer multiplication and use of powers of 10 to adjust the answer to the original calculation.
</misconception>
<misconception>
  Unit: Arithmetic procedures with integers and decimals
  Year: Year 7
  Content:
  misconception: Students try to divide an integer with an integer without simplifying.
  response: Student are required to convert the divisor into an integer. Simplifying the denominator into a single integer digit is preferable.
</misconception>
<misconception>
  Unit: Arithmetic procedures with integers and decimals
  Year: Year 7
  Content:
  misconception: Division is commutative given some divisions can give the same answer. eg. 8000/4/2 = 8000/2/4
  response: To check for all rearrangements of the number e.g. 2/4/8000 does not equal 8000/4/2
</misconception>
<misconception>
  Unit: Arithmetic procedures with integers and decimals
  Year: Year 7
  Content:
  misconception: The distributive law only uses addition eg 24 x 99 = 24 x (90 + 9) = 24 x 90  + 24 x 9
  response: Subtraction is important as it can simplify the calculation 24 x 99 = 24 x (100 - 1) = 24 x 100 - 24 x 1
</misconception>
<misconception>
  Unit: Arithmetic procedures with integers and decimals
  Year: Year 7
  Content:
  misconception: Students do not see the implicit brackets. Eg. Sqrt(49 + 36) is not sqrt(49) + sqrt(36)
  response: Look for extended lines or operations which indicate an implicit brackets.
</misconception>
<misconception>
  Unit: Arithmetic procedures with integers and decimals
  Year: Year 7
  Content:
  misconception: The use of negatives are confused with subtractions.
  response: Writing the negative numbers in brackets and using the additive inverse will help minimise errors.
</misconception>
<misconception>
  Unit: Arithmetic procedures with integers and decimals
  Year: Year 7
  Content:
  misconception: The common multiplier is the number seen to be common eg. 1.2 x 20 + 1.2 x 30 + 1.2 x 10 
  response: Students can use the associative law to find more common multipliers  eg. 1.2 x 10 x 2 + 1.2 x 10 x3  + 1.2 x 10 = 12 x 2 + 12 x 3 + 12 x 1 
</misconception>
<misconception>
  Unit: Arithmetic procedures with integers and decimals
  Year: Year 7
  Content:
  misconception: Students often forget to scroll out of an operation or function.
  response: Emphasis the cursor buttons allow users to scroll around the apps, functions and calculations on the calculator. 
</misconception>
<misconception>
  Unit: Arithmetic procedures with integers and decimals
  Year: Year 7
  Content:
  misconception: Students are unsure where to start on problem solving questions.
  response: Starting with one sentence at a time and isolating what the strategy is first before doing any calculation is important. 
</misconception>
<misconception>
  Unit: Comparing and ordering fractions and decimals (positive and negative)
  Year: Year 7
  Content:
  misconception: When dividing a number line, there is confusion between the intervals and lines.
  response: Pupils can write the number on each mark on the number line to ensure equal intervals.
</misconception>
<misconception>
  Unit: Comparing and ordering fractions and decimals (positive and negative)
  Year: Year 7
  Content:
  misconception: As the denominator is larger the value of the fraction is larger.
  response: An analogy of sharing pizza helps students understand. Would pupils get a bigger slice of pizza if it was shared between more people?
</misconception>
<misconception>
  Unit: Comparing and ordering fractions and decimals (positive and negative)
  Year: Year 7
  Content:
  misconception: A mixed number can be confused with an integer multiplying by the proper fraction.
  response: Emphasise the language eg. 3 and a 1/2  means 3 + 1/2.
</misconception>
<misconception>
  Unit: Comparing and ordering fractions and decimals (positive and negative)
  Year: Year 7
  Content:
  misconception: Some pupils can miscalculate the mixed number to an improper fraction.
  response: For smaller numbers, encourage pupils to draw bar models or diagrams to show the relationship between the whole and the improper fraction.
</misconception>
<misconception>
  Unit: Comparing and ordering fractions and decimals (positive and negative)
  Year: Year 7
  Content:
  misconception: Denominators that are multiples of 10 will give a terminating decimal.
  response: Investigate the difference between powers of 10 and multiples of 10. e.g 7/30 and 7/100
</misconception>
<misconception>
  Unit: Comparing and ordering fractions and decimals (positive and negative)
  Year: Year 7
  Content:
  misconception: Converting a fraction to a recurring decimal and then rounding the decimal, gives an accurate answer
  response: The use of fractions is more preferred for accuracy than decimals. e.g 1/3 + 1/3 + 1/3 is not 0.3 + 0.3 + 0.3
</misconception>
<misconception>
  Unit: Comparing and ordering fractions and decimals (positive and negative)
  Year: Year 7
  Content:
  misconception: The more decimal places there are, the greater the number.
  response: Pupils can investigate this by looking at the numbers 0.23 and 0.1237 and using a common denominator or 10000.
</misconception>
<misconception>
  Unit: Comparing and ordering fractions and decimals (positive and negative)
  Year: Year 7
  Content:
  misconception: Pupils may think they just 'get rid' of integers which appear in both numerator and denominator.
  response: Reinforce that you are multiplying by 1, which doesn't change the value and therefore can be omitted from further calculations.
</misconception>
<misconception>
  Unit: Comparing and ordering fractions and decimals (positive and negative)
  Year: Year 7
  Content:
  misconception: The calculator rounds recurring/non-terminating decimals to 10 d.p. and it is not terminating.
  response: The fractional form will give a clearer idea if the decimal equivalent is terminating or not.
</misconception>
<misconception>
  Unit: Comparing and ordering fractions and decimals (positive and negative)
  Year: Year 7
  Content:
  misconception: Incorrect inputting of negative numbers and/or exponents.
  response: Encourage the use of brackets when using exponents. 
</misconception>
<misconception>
  Unit: Comparing and ordering fractions and decimals (positive and negative)
  Year: Year 7
  Content:
  misconception: That just the absolute value is considered and not the integer in its entirety.
  response: Encourage pupils to consider the integers as temperatures even if there are no temperature units.
</misconception>
<misconception>
  Unit: Comparing and ordering fractions and decimals (positive and negative)
  Year: Year 7
  Content:
  misconception: Considering the decimal part of a number to be an integer.
  response: Reinforce the use of a place value table and working from left to right when comparing decimals.  It can be useful to use money here.
</misconception>
<misconception>
  Unit: Comparing and ordering fractions and decimals (positive and negative)
  Year: Year 7
  Content:
  misconception: Fractions with denominators that are not a factors of 10^n cannot be converted into a decimal.
  response: This is a good opportunity to reiterate that fractions are an alternative way of writing a division. 
</misconception>
<misconception>
  Unit: Comparing and ordering fractions and decimals (positive and negative)
  Year: Year 7
  Content:
  misconception: Choosing to the find the product of the denominators in order to compare fractions.
  response: Although this is not wrong it can be inefficient.  This can be illustrated using large denominators which have a much lower HCF.
</misconception>
<misconception>
  Unit: Comparing and ordering fractions and decimals (positive and negative)
  Year: Year 7
  Content:
  misconception: That fractions can only be compared using a common denominator.
  response: Lots of visual representations are useful here looking at what happens to the size of the 'parts' as the denominator increases.
</misconception>
<misconception>
  Unit: Comparing and ordering fractions and decimals (positive and negative)
  Year: Year 7
  Content:
  misconception: Changing all fractions and decimals to a common format without considering obvious comparisons.
  response: This could be an opportunity to talk about familiar conversions including halves, quarters and fifths.
</misconception>
<misconception>
  Unit: Comparing and ordering fractions and decimals (positive and negative)
  Year: Year 7
  Content:
  misconception: When decimals go beyond thousandths you cannot find a number between 2 numbers.
  response: Use a 'zoomable' number line to show what happens as we zoom in.
</misconception>
<misconception>
  Unit: Comparing and ordering fractions and decimals (positive and negative)
  Year: Year 7
  Content:
  misconception: Assuming  that there are 100 minutes in an hour and converting 3.25 hours to 3 hours 25 minutes.
  response: Start with half an hour, pupils should be happy that half an hour is 30 mins, show it written as a decimal to highlight it's not 3.3 hours
</misconception>
<misconception>
  Unit: Expressions and equations
  Year: Year 7
  Content:
  misconception: Pupils might think that a pattern increasing by 3 each time has the rule add 3.
  response: Pupils should think about the number of lines per square and the relationship between squares and lines. Avoid consecutive patterns to start
</misconception>
<misconception>
  Unit: Expressions and equations
  Year: Year 7
  Content:
  misconception: Pupils think division has to be calculated before multiplication and addition before subtraction.
  response: Show pupils different ways of working out the same calculation that gives the same answer.
</misconception>
<misconception>
  Unit: Expressions and equations
  Year: Year 7
  Content:
  misconception: Pupils often think a=1 b=2 ... or that a letter represents an object
  response: Letters represent a numerical value either unknown or variable. Avoid always using the first letter of the words used in a scenario.
</misconception>
<misconception>
  Unit: Expressions and equations
  Year: Year 7
  Content:
  misconception: Pupils may write a3 instead of 3a to represent multiplication of a and 3.
  response: Use algebra tiles to show a x 3 gives 3 lots of a. Highlight that conventions make mathematics clearer to read and avoids miscommunication.
</misconception>
<misconception>
  Unit: Expressions and equations
  Year: Year 7
  Content:
  misconception: Pupils may think the coefficient of b in a-2b is 2 instead of -2 .
  response: Show subtraction as addition of a negative value. This can be done with negative algebra tiles.
</misconception>
<misconception>
  Unit: Expressions and equations
  Year: Year 7
  Content:
  misconception: Pupils may think that letters always represent a set value that can be 'found'.
  response: Highlight the distinction between unknowns and variables. Allow pupils to explore expressions intrinsically before substituting in values.
</misconception>
<misconception>
  Unit: Expressions and equations
  Year: Year 7
  Content:
  misconception: Pupils may thing that letters represent an item e.g a week equals 7 days so w=7d
  response: Get pupils to identify what value the letter represents e.g the number of days then say a number sentence that describes the relationship.
</misconception>
<misconception>
  Unit: Expressions and equations
  Year: Year 7
  Content:
  misconception: Pupils may struggle with exponents especially which value to square when variables have coefficients
  response: Reminder of priority of operations and the exponent acts on the value it is directly preceded by. 
</misconception>
<misconception>
  Unit: Expressions and equations
  Year: Year 7
  Content:
  misconception: 2y and 3y are not like terms because they have different coefficients.
  response: Think of 'Unitising'. 3cm and 8cm. What are the units? 8mg and 10mg. What are the units? 2y and 3y. What are we 'unitising' here?
</misconception>
<misconception>
  Unit: Expressions and equations
  Year: Year 7
  Content:
  misconception: Simplifying means just grouping the algebraic terms.
  response: Remind pupils that fully simplifying means the expression cannot be simplified further.
</misconception>
<misconception>
  Unit: Expressions and equations
  Year: Year 7
  Content:
  misconception: 3(y+2) expands to 3y+2.
  response: 3 lots of 12 isn't 3x10+2 so 3 lots of (y+2) isn't 3y+2. Get students to draw this out. To visualise it.
</misconception>
<misconception>
  Unit: Expressions and equations
  Year: Year 7
  Content:
  misconception: How to deal with exponents. y^2 times by y makes 3y. Or at least has a coefficient that is not 1.
  response: Unsimplifying first. Not sure? Break it down. What is it? a^2 is a x a. So a^2 x a must be a x a x a.
</misconception>
<misconception>
  Unit: Expressions and equations
  Year: Year 7
  Content:
  misconception: Pupils may think 5(y+1)-2(y+3) = 5y+5-2y+6
  response: Correct use of the distributive law with either algebra tiles or an area model will demonstrate why this is wrong.
</misconception>
<misconception>
  Unit: Expressions and equations
  Year: Year 7
  Content:
  misconception: 2(z+7)+3(z+7)+5(z+7) must be expanded first before simplifying.
  response: Think of 'Unitising'. What is it we are adding together? In this case, we are summing multiples of (z+7). How many lots do we have?
</misconception>
<misconception>
  Unit: Expressions and equations
  Year: Year 7
  Content:
  misconception: That factors only apply to whole numbers and a factor needs to be a whole number.
  response: Whilst this is true for numerical factors, the factors of 7ab are 1, 7, a, b, 7a, 7b and ab.
</misconception>
<misconception>
  Unit: Expressions and equations
  Year: Year 7
  Content:
  misconception: 2(3y+9) is not factorised.
  response: It is factorised; just not fully. The distinction is important as sometimes it can be beneficial to not fully factorise.
</misconception>
<misconception>
  Unit: Expressions and equations
  Year: Year 7
  Content:
  misconception: A variable and an unknown are the same thing. 
  response: A variable's value is not fixed. It can take any value within a given range. This means algebraic statements using variables can form proofs
</misconception>
<misconception>
  Unit: Perimeter and area
  Year: Year 7
  Content:
  misconception: Pupils may think a diamond is an example of a quadrilateral.
  response: Rhombus is the correct mathematical name for the shape that pupils may refer to as a diamond.
</misconception>
<misconception>
  Unit: Perimeter and area
  Year: Year 7
  Content:
  misconception: Pupils may confuse perimeter and area.
  response: Perimeter is the distance around a 2D shape. Area is the size of the surface.
</misconception>
<misconception>
  Unit: Perimeter and area
  Year: Year 7
  Content:
  misconception: Pupils may not count all sides when calculating the perimeter due to the complexity of the shape.
  response: Encourage pupils to mark the sides as they record the measurement to ensure they count every side length.
</misconception>
<misconception>
  Unit: Perimeter and area
  Year: Year 7
  Content:
  misconception: Pupils may struggle to think of a different context to apply to finding the perimeter.
  response: An alternative context could be: putting a ribbon around a cake and leaving space for decoration.
</misconception>
<misconception>
  Unit: Perimeter and area
  Year: Year 7
  Content:
  misconception: Pupils may think they can always double the length and width to calculate the perimeter.
  response: This only works for composite rectilinear shapes if the lengths do not overlap.
</misconception>
<misconception>
  Unit: Perimeter and area
  Year: Year 7
  Content:
  misconception: Pupils may forget to halve after multiplying the base and the perpendicular height.
  response: The area of a triangle is equal to half the area of the parallelogram formed by two of those triangles.
</misconception>
<misconception>
  Unit: Perimeter and area
  Year: Year 7
  Content:
  misconception: Pupils may think the height of the triangle is the slanted height rather than perpendicular.
  response: The base and height to be used must be perpendicular (at a right angle) to each other.
</misconception>
<misconception>
  Unit: Perimeter and area
  Year: Year 7
  Content:
  misconception: Breaking the shape into rectangles is always the best approach.
  response: There is not always enough information to use that method so flexible thinking is required.
</misconception>
<misconception>
  Unit: Perimeter and area
  Year: Year 7
  Content:
  misconception: Pupils may try to combine lengths that are not parallel to a known side length.
  response: For two sets of side lengths to be equal, one set must be parallel to the other and none of the lengths can overlap.
</misconception>
<misconception>
  Unit: Perimeter and area
  Year: Year 7
  Content:
  misconception: Pupils may incorrectly identify the base of the triangle in the trapezium.
  response: Drawing a trapezium on paper, colouring the sides and cutting it will help them see where the base of the triangle comes from.
</misconception>
<misconception>
  Unit: Perimeter and area
  Year: Year 7
  Content:
  misconception: Pupils may forget to divide by 2 when calculating the area of a trapezium.
  response: The area of a trapezium is half of the area of the parallelogram formed from two identical trapeziums.
</misconception>
<misconception>
  Unit: Perimeter and area
  Year: Year 7
  Content:
  misconception: Pupils may struggle to determine whether a question is asking about the perimeter or the area. 
  response: Encourage pupils to draw a diagram to represent the situation as this can make it clearer as to whether perimeter or area is required.
</misconception>
<misconception>
  Unit: Place value
  Year: Year 7
  Content:
  misconception: When making a 3-digit integer pupils use 0 as the first digit. However 057 is not a 3-digit integer.
  response: Leading zeros are not written. They are not needed to preserve the place value of other digits. 057 is still a 2-digit integer.
</misconception>
<misconception>
  Unit: Place value
  Year: Year 7
  Content:
  misconception: Pupils may think the digit card 0 has to have significant place value.
  response: If the question doesn't specify the number of digits, leading zeros can be used (and not written) to create integers with fewer digits.
</misconception>
<misconception>
  Unit: Place value
  Year: Year 7
  Content:
  misconception: 40 thousands placing the 4 in the thousands column. 
  response: As there are 40 thousands the 4 is in the ten thousands column.
</misconception>
<misconception>
  Unit: Place value
  Year: Year 7
  Content:
  misconception: 10^3 means 10 x 3
  response: 10 x 3 = 30.  10^3 = 10 x 10 x 10 = 1000.
</misconception>
<misconception>
  Unit: Place value
  Year: Year 7
  Content:
  misconception: Students can incorrectly insert a digit in the wrong place value column.
  response: Printing or white board drawings of a place value chart will support student understanding of the different column headings and place value.
</misconception>
<misconception>
  Unit: Place value
  Year: Year 7
  Content:
  misconception: Pupils may consider non-metric units in discussion.
  response: Remind them that the metric units are based around the metre, gram and litre only.
</misconception>
<misconception>
  Unit: Place value
  Year: Year 7
  Content:
  misconception: Kilo gram is 1000 bigger than a gram, so 40 g = 1000 x 40 kg
  response: Kilo gram is 1000 bigger than a gram so 1 kg = 1000 g. 
</misconception>
<misconception>
  Unit: Place value
  Year: Year 7
  Content:
  misconception: Pupils may get mixed up between metric and imperial units.
  response: You may wish to refer to Lesson 6 of this unit, which explains the metric system’s use of prefixes, and compare this with imperial measures.
</misconception>
<misconception>
  Unit: Place value
  Year: Year 7
  Content:
  misconception: A "longer" (with more digits) number must be greater.
  response: 35.67208 < 36   
</misconception>
<misconception>
  Unit: Place value
  Year: Year 7
  Content:
  misconception: The number with the largest value is the greatest measurement.
  response: Converting to the same unit can be helpful before comparing the place value of the digits. e.g. 0.4 m is bigger than 40 mm.
</misconception>
<misconception>
  Unit: Place value
  Year: Year 7
  Content:
  misconception: You have to convert to the same unit to decide if a measure is the same as another.
  response: For metric units it is possible to compare the digits. Any conversion within metric has the same digits in the same order.  
</misconception>
<misconception>
  Unit: Plotting coordinates
  Year: Year 7
  Content:
  misconception: Confusion between which is which out of (1,4) and (4,1). Is it up and along? Along and up?
  response: Clarity of language helps. Coordinates are written x, then y coordinate. Move first in the x-direction. There are no 'corridors and stairs'.
</misconception>
<misconception>
  Unit: Plotting coordinates
  Year: Year 7
  Content:
  misconception: (-2,3), (2,-3), (-2,-3) can be confusing as pupils can confuse $$x$$ and $$y$$.
  response: Talk about positive $$x$$-direction, negative $$x$$-direction. This will help the students to visualise which quadrant to plot in.
</misconception>
<misconception>
  Unit: Plotting coordinates
  Year: Year 7
  Content:
  misconception: That coordinates only exist, and can only be plotted, on the lines of graph paper.
  response: Between any two vertices there are infinitely more points. Ask pupils to consider what numbers are between 1 and 2.
</misconception>
<misconception>
  Unit: Plotting coordinates
  Year: Year 7
  Content:
  misconception: Pupils may try to spot patterns between consecutive coordinates. E.g. the y value goes up in ones.
  response: Get pupils to think about the relationship between x and y within a coordinate. Include non-integer values and coordinates not in order.
</misconception>
<misconception>
  Unit: Plotting coordinates
  Year: Year 7
  Content:
  misconception: Pupils may think that coordinates that make a square/ rectangle follow a linear pattern.
  response: In order for coordinates to follow a rule written as an equation, there needs to be a relationship between the values within a coordinate. 
</misconception>
<misconception>
  Unit: Plotting coordinates
  Year: Year 7
  Content:
  misconception: Pupils may join up their coordinates but not extend their line.
  response: Lines are used to represent all coordinates that follow a rule. Unless given restrictions, lines should be infinitely long.
</misconception>
<misconception>
  Unit: Plotting coordinates
  Year: Year 7
  Content:
  misconception: Adding the length of the side onto the wrong value within a coordinate.
  response: Use sketches/ erasable axis/ Desmos to plot points and see if they are reasonable. Encourage writing/drawing on diagrams as working out.
</misconception>
<misconception>
  Unit: Properties of number: factors, multiples, squares and cubes
  Year: Year 7
  Content:
  misconception: There is often confusion between factors and multiples.
  response: Highlight that the number of dots in an array is the multiple and the number of dots in each column & row are the factors.
</misconception>
<misconception>
  Unit: Properties of number: factors, multiples, squares and cubes
  Year: Year 7
  Content:
  misconception: All factors of all integers will appear in a 12 by 12 times table grid.
  response: It is not possible to identify all factors of 24 using a 12 by 12 times table grid.
</misconception>
<misconception>
  Unit: Properties of number: factors, multiples, squares and cubes
  Year: Year 7
  Content:
  misconception: A common multiple of all integers is 1.
  response: Get students to list multiples. This is to highlight the fact that 1 is only a multiple of 1.
</misconception>
<misconception>
  Unit: Properties of number: factors, multiples, squares and cubes
  Year: Year 7
  Content:
  misconception: Incorrectly summing the digits of an integer to identify a multiple of 3.
  response: Use number bonds to sum large numbers of digits.
</misconception>
<misconception>
  Unit: Properties of number: factors, multiples, squares and cubes
  Year: Year 7
  Content:
  misconception: Incorrectly summing the digits to identify a multiple of 3 or 9.
  response: Use number bonds to sum large numbers of digits.
</misconception>
<misconception>
  Unit: Properties of number: factors, multiples, squares and cubes
  Year: Year 7
  Content:
  misconception: A number is a prime if it is not divisible by 2, 3, 5 or 10.
  response: A factor of a number can be greater than 10.
</misconception>
<misconception>
  Unit: Properties of number: factors, multiples, squares and cubes
  Year: Year 7
  Content:
  misconception: Often students only consider the last 2 digits of a number to check for divisibility for 8.
  response: The last 2 digits check for divisibility for 4 not 8.
</misconception>
<misconception>
  Unit: Properties of number: factors, multiples, squares and cubes
  Year: Year 7
  Content:
  misconception: Students think that all numbers are square numbers as you can square any integer.
  response: A square is the product of 2 repeated integers.
</misconception>
<misconception>
  Unit: Properties of number: factors, multiples, squares and cubes
  Year: Year 7
  Content:
  misconception: The root of an integer is half of the integer.
  response: The square root is the inverse of a square number. A square is the product of 2 repeated integers.
</misconception>
<misconception>
  Unit: Properties of number: factors, multiples, squares and cubes
  Year: Year 7
  Content:
  misconception: When different bases are used student multiply the bases.  e.g. 2 x 5^2 = 10^2
  response: Calculate and compare the 2, 2 x 5^2 = 50 & 10^2 = 100
</misconception>
<misconception>
  Unit: Properties of number: factors, multiples, squares and cubes
  Year: Year 7
  Content:
  misconception: Students forget to scroll right to exit the exponent function.
  response: Encourage students to check what they have on their screen matches the calculation exactly.
</misconception>
<misconception>
  Unit: Properties of number: factors, multiples, squares and cubes
  Year: Year 7
  Content:
  misconception: Students often use an adhoc approach to listing multiples this often leads to pairs being missed out
  response: Encourage a systematic approach starting with 1 and the integer.
</misconception>
<misconception>
  Unit: Properties of number: factors, multiples, squares and cubes
  Year: Year 7
  Content:
  misconception: 1 is a prime number
  response: 1 is not a prime number as it only has one factor and a prime number has exactly two factors.
</misconception>
<misconception>
  Unit: Properties of number: factors, multiples, squares and cubes
  Year: Year 7
  Content:
  misconception: Use of addition instead of multiplication when the decomposing the number.
  response: Reiterate that the product of prime factors is unique.
</misconception>
<misconception>
  Unit: Properties of number: factors, multiples, squares and cubes
  Year: Year 7
  Content:
  misconception: Identifying if integer is a multiple when its given in its prime factor form.
  response: Only the bases need to be considered, not the exponents.  e.g if it is a multiple of 3 it must be a multiple of 3^2, 3^3, etc.
</misconception>
<misconception>
  Unit: Properties of number: factors, multiples, squares and cubes
  Year: Year 7
  Content:
  misconception: Common factors are put into the intersection of the Venn diagram twice instead of once.
  response: Encourage students to check that the product of the factors in each set is the correct integer.
</misconception>
<misconception>
  Unit: Properties of number: factors, multiples, squares and cubes
  Year: Year 7
  Content:
  misconception: When using a Venn diagram misplacement of factors is common.  
  response: Encourage students to check that the product of factors in each set is the correct integer.
</misconception>
<misconception>
  Unit: Properties of number: factors, multiples, squares and cubes
  Year: Year 7
  Content:
  misconception: When using a Venn diagram students often mix up HCF & LCM.
  response: Encourage students to check the reasonableness of their answer. 
</misconception>
<misconception>
  Unit: Properties of number: factors, multiples, squares and cubes
  Year: Year 7
  Content:
  misconception: Real life measurements aren't always integers. Use of integers can give more a practical application
  response: e.g. find the largest with 200 blocks, the cbrt(200) is not an integer so we use 5 x 5 x 5  =125
</misconception>
<misconception>
  Unit: Transformations
  Year: Year 7
  Content:
  misconception: Students may believe two shapes are congruent based purely on the shape and not the size as well. 
  response: Consider squares - all squares have the same angles and are visually identical but if the lengths are different they're not congruent.
</misconception>
<misconception>
  Unit: Transformations
  Year: Year 7
  Content:
  misconception: Students may confuse the term transformation for translation.
  response: Translation is one type of transformation.
</misconception>
<misconception>
  Unit: Transformations
  Year: Year 7
  Content:
  misconception: Students may count between the closest two vertices rather than corresponding points.
  response: Remind frequently that it needs to be between corresponding vertices, labelling may help for this.
</misconception>
<misconception>
  Unit: Transformations
  Year: Year 7
  Content:
  misconception: Students may translate vertically before horizontally.
  response: Remind the students that the column vectors work in the same way as coordinates.
</misconception>
<misconception>
  Unit: Transformations
  Year: Year 7
  Content:
  misconception: After an object has been rotated, the orientation stays the same if the image looks the same.
  response: This is only true if the object is rotated through 360°. Otherwise, the orientation is different as each vertex is in a different position.
</misconception>
<misconception>
  Unit: Transformations
  Year: Year 7
  Content:
  misconception: "Right means clockwise" and "left means anti-clockwise"
  response: This is only true when referencing the top of the object being rotated. Rotating "left" and "right" is incorrect for all other vertices.
</misconception>
<misconception>
  Unit: Transformations
  Year: Year 7
  Content:
  misconception: The centre of rotation is always in the centre of an object.
  response: The centre of rotation can be anywhere. If it's outside the shape, imagine it like a pole in the ground, attached to the object by a rope.
</misconception>
<misconception>
  Unit: Transformations
  Year: Year 7
  Content:
  misconception: After drawing an object on the tracing paper, you take the tracing paper off the table to rotate it.
  response: This is especially dangerous if the centre of rotation wasn't drawn on the tracing paper, too. The image will lose its correct location.
</misconception>
<misconception>
  Unit: Transformations
  Year: Year 7
  Content:
  misconception: Just because the sense has changed, it doesn't mean a reflection has occurred.
  response: If an image has a different sense to its object, there has definitely been a reflection - the line of reflection may be at an obscure angle.
</misconception>
<misconception>
  Unit: Transformations
  Year: Year 7
  Content:
  misconception: Line segments connecting corresponding points on an image and object can intersect each other.
  response: Corresponding point line segments after a reflection never intersect. If they do, then corresponding points have not been paired correctly.
</misconception>
<misconception>
  Unit: Transformations
  Year: Year 7
  Content:
  misconception: Diagonal reflections that incorrectly look like rotations or translations of the object.
  response: False reflections that look like this are due to students not counting diagonals of grid squares, perpendicular to the mirror line.
</misconception>
<misconception>
  Unit: Transformations
  Year: Year 7
  Content:
  misconception: Enlargement only refers to an increase in size.
  response: The transformation 'enlargement' refers to a change of size that can be either a stretch or a shrink.
</misconception>
<misconception>
  Unit: Transformations
  Year: Year 7
  Content:
  misconception: Pupils may want to use division instead of fractional scale factors.
  response: Dividing by 2 gives the same result as multiplying by a half. However, the scale factor is defined as a multiplier, not a divisor.
</misconception>
<misconception>
  Unit: Transformations
  Year: Year 7
  Content:
  misconception: Pupils may initially be unsure when enlarging shapes on different background in Q2 of Task B.
  response: Stress that they can use the same methods as for square or plain backgrounds (e.g. using a ruler, counting units along gridlines). 
</misconception>
<misconception>
  Unit: Transformations
  Year: Year 7
  Content:
  misconception: Students may confuse reflections and rotations depending on the object.
  response: A reflection is the only transformation that changes the sense of the object, so check that first.
</misconception>
<misconception>
  Unit: Transformations
  Year: Year 7
  Content:
  misconception: Pupils may struggle with only being able to rotate anticlockwise on Desmos.
  response: Turning clockwise x degrees is equivalent to turning anticlockwise (360 - x) degrees.
</misconception>
<misconception>
  Unit: Transformations
  Year: Year 7
  Content:
  misconception: There may be occasions when pupils cannot find the tool they are looking for.
  response: Ask them to click 'more' in the toolbar, scroll down and then click 'more' again.
</misconception>
<misconception>
  Unit: Transformations
  Year: Year 7
  Content:
  misconception: When completing an inverse translation, students may believe they need to flip the vector.
  response: Ask students to say in words how you would return to the starting point, to highlight the direction needed and then link to the vector.
</misconception>
<misconception>
  Unit: Understanding multiplicative relationships: fractions and ratio
  Year: Year 7
  Content:
  misconception: Pupils only see the amount, not proportion. e.g £30 from £100 is no different to £30 from £60.
  response: Referring to the whole using bar models or fractions can emphasise the amount with respect to the whole. 
</misconception>
<misconception>
  Unit: Understanding multiplicative relationships: fractions and ratio
  Year: Year 7
  Content:
  misconception: Using multiplication as repeated addition leads to incorrect additive strategies of ratios.
  response: Focus on the multiplicative relationships between parts to whole or whole to parts. Ratio allow the multiplicative relationship to be seen.
</misconception>
<misconception>
  Unit: Understanding multiplicative relationships: fractions and ratio
  Year: Year 7
  Content:
  misconception: Only seeing multiplication as repeated addition leads to incorrect additive strategies for ratios.
  response: Focus on the multiplicative relationships between parts to whole or whole to parts. Ratios allow the multiplicative relationship to be seen.
</misconception>
<misconception>
  Unit: Understanding multiplicative relationships: fractions and ratio
  Year: Year 7
  Content:
  misconception: Pupils see the bar model and/or fraction as the whole as opposed to the proportion of the whole.
  response: Emphasise equivalent fractions and equivalent bar models which show different parts to whole, but are the same proportion.  e.g 3/5 = 60/100
</misconception>
<misconception>
  Unit: Understanding multiplicative relationships: fractions and ratio
  Year: Year 7
  Content:
  misconception: Using additive strategies instead of multiplicative.
  response: Emphasise that proportional relationships maintain a constant multiplier so we are looking for a multiplicative relationship. 
</misconception>
<misconception>
  Unit: Understanding multiplicative relationships: fractions and ratio
  Year: Year 7
  Content:
  misconception: Using multiplication as repeated addition leads to incorrect additive strategies of ratios.
  response: Focus on the multiplicative relationships between parts to whole or whole to parts. Ratio tables can help see this more easily. 
</misconception>
<misconception>
  Unit: Understanding multiplicative relationships: fractions and ratio
  Year: Year 7
  Content:
  misconception: Both lines of a double number line must start at zero and these zeros must be aligned.
  response: When drawing double number lines, ensure to align the zeros and the known equivalents. Showing how a graph is formed from a DNL can help.
</misconception>
<misconception>
  Unit: Understanding multiplicative relationships: fractions and ratio
  Year: Year 7
  Content:
  misconception: To find one part,  some students simply divide the amount by the sum of the 'parts' of the ratio.
  response: Strengthen understanding of which amount represents which part of the ratio.  Matching problems to bar models helps.
</misconception>
<misconception>
  Unit: Understanding multiplicative relationships: fractions and ratio
  Year: Year 7
  Content:
  misconception: An assumption that you cannot find a fraction greater than 1 of an amount.
  response: Recognising that 'of' and multiplication are equivalent should help with this , as pupils are familiar with multiplying fractions.
</misconception>
<misconception>
  Unit: Understanding multiplicative relationships: fractions and ratio
  Year: Year 7
  Content:
  misconception: Only seeing the amount, not proportion.  E.g £30 from £100 is no different to £30 from £60.
  response: Referring to the whole using bar models or fractions can emphasise the amount with respect to the whole.
</misconception>
<misconception>
  Unit: Understanding multiplicative relationships: fractions and ratio
  Year: Year 7
  Content:
  misconception: Only see the amount, not proportion.  E.g £30 from £100 is no different to £30 from £60.
  response: Referring to the whole using bar models or fractions can emphasise the amount with respect to the whole.
</misconception>
<misconception>
  Unit: Understanding multiplicative relationships: fractions and ratio
  Year: Year 7
  Content:
  misconception: Always dividing the amount by the sum of the 'parts' of the ratio to get one 'part'.
  response: Offer opportunities to match problems to bar models, ensure the same numbers are used to highlight the differences.
</misconception>
<misconception>
  Unit: Understanding multiplicative relationships: fractions and ratio
  Year: Year 7
  Content:
  misconception: Always dividing the amount by the sum of the 'parts' of the ratio to get one 'part'.
  response: Offer opportunities to match problems to bar models, ensure the same numbers are used to highlight the differences.
</misconception>
<misconception>
  Unit: Understanding multiplicative relationships: fractions and ratio
  Year: Year 7
  Content:
  misconception: Always dividing the amount by the sum of the 'parts' of the ratio to get one 'part'.
  response: Offer opportunities to match problems to bar models, ensure the same numbers are used to highlight the differences.
</misconception>
<misconception>
  Unit: Understanding multiplicative relationships: fractions and ratio
  Year: Year 7
  Content:
  misconception: Using multiplication as repeated addition leads to incorrect additive strategies of ratios.
  response: Focus on the multiplicative relationships between parts to whole or whole to parts.
</misconception>
<misconception>
  Unit: Understanding multiplicative relationships: fractions and ratio
  Year: Year 7
  Content:
  misconception: Using multiplication as repeated addition leads to incorrect additive strategies of ratios.
  response: Focus on the multiplicative relationships between parts to whole or whole to parts.
</misconception>
<misconception>
  Unit: Understanding multiplicative relationships: fractions and ratio
  Year: Year 7
  Content:
  misconception: Always dividing the amount by the sum of the 'parts' of the ratio to get one 'part'.
  response: Offer opportunities to match problems to bar models ensure the same numbers are used to highlight the differences.
</misconception>
<misconception>
  Unit: Constructions
  Year: Year 8
  Content:
  misconception: When drawing circles, pupils may find that the start and end of their arcs do not join together.
  response: This can be caused by the pair of compasses opening or closing mid-drawing. Hold it with one hand and rest the pencil gently on the page.
</misconception>
<misconception>
  Unit: Constructions
  Year: Year 8
  Content:
  misconception: Pupils may find it difficult to decide where to mark the centre point of each circle during Task A.
  response: Pupils could start the task by drawing a pair of circles and labelling it with the question that presents the matching description.
</misconception>
<misconception>
  Unit: Constructions
  Year: Year 8
  Content:
  misconception: During tasks, pupils may use a ruler to draw or check whether points are equidistant from a centre.
  response: While the tasks could be completed with a ruler, it may be quicker, easier and more accurate to use a pair of compasses.
</misconception>
<misconception>
  Unit: Constructions
  Year: Year 8
  Content:
  misconception: Pupils may avoid using the pair of compasses and opt for a ruler instead.
  response: Emphasise the efficiency and accuracy of using compasses instead of a ruler in the construction of their triangles.
</misconception>
<misconception>
  Unit: Constructions
  Year: Year 8
  Content:
  misconception:  Pupils may avoid using the pair of compasses and opt for a ruler instead.
  response: Emphasise the efficiency and accuracy of using compasses instead of a ruler in the construction of their triangles.
</misconception>
<misconception>
  Unit: Constructions
  Year: Year 8
  Content:
  misconception: Pupils may struggle with a diagonal of a shape being vertical or horizontal.
  response: By reminding pupils of the definition, ask them to check if it fits and the shape could be rotated as well.
</misconception>
<misconception>
  Unit: Constructions
  Year: Year 8
  Content:
  misconception: I can use a protractor to measure an angle, then half that angle to bisect it.
  response: Constructions, such as bisecting an angle, are methods of creating & modifying shapes & angles in ways that don't require measurement tools.
</misconception>
<misconception>
  Unit: Constructions
  Year: Year 8
  Content:
  misconception: I can use a ruler to measure the midpoint of a line segment, and a protractor to find 90°.
  response: Constructions, such as perpendicular bisectors, are methods of creating & modifying shapes & angles in ways that don't require measurements.
</misconception>
<misconception>
  Unit: Constructions
  Year: Year 8
  Content:
  misconception: You can't accurately draw the perpendicular to a point on a line segment close to its endpoint.
  response: The perpendicular to a line segment through any point can be found; some line segments just require extending in length first.
</misconception>
<misconception>
  Unit: Constructions
  Year: Year 8
  Content:
  misconception: You always need to draw circles that are the same size to construct any polygon.
  response: Some polygons, such as kites, require you to construct two circles of different size, as long as they still intersect at two points.
</misconception>
<misconception>
  Unit: Estimation and rounding
  Year: Year 8
  Content:
  misconception: When rounding a number, pupils write the first significant digit(s) only.  E.g 36 789 is 4.
  response: The use of the place value table shows the magnitude of the number, thus preserving their place value. 
</misconception>
<misconception>
  Unit: Estimation and rounding
  Year: Year 8
  Content:
  misconception: The assumption that if a number ends in 2 zeros it must have been rounded to the nearest hundred.  
  response: Choose examples that round to the same value when rounded to the nearest ten and hundred in this case.  E.g. 398, rounds to 400 to the nearest ten and 400 to the nearest hundred.
</misconception>
<misconception>
  Unit: Estimation and rounding
  Year: Year 8
  Content:
  misconception: Errors when a zero is required when rounding. E.g 5.99 rounds to 6 to 1 d.p.
  response: Embedding that 6 and 6.0 may be written like that to convey the accuracy they've been rounded to. To show that 5.99 has been rounded to 1 d.p. we write it as 6.0 not 6.
</misconception>
<misconception>
  Unit: Estimation and rounding
  Year: Year 8
  Content:
  misconception: Pupils think that repeated rounding gives the correct answer.
  response: Use a number line to support pupils’ understanding. Locate the number to be rounded on the line and identify the critical values.
</misconception>
<misconception>
  Unit: Estimation and rounding
  Year: Year 8
  Content:
  misconception: Assuming all zero digits are not significant.
  response: Within the lesson there are many examples where some zeros are significant. Relate significance back to the communication of accuracy and that some digits are significant as they preserve the place value of other digits. 
</misconception>
<misconception>
  Unit: Estimation and rounding
  Year: Year 8
  Content:
  misconception: Assuming all zero digits are not significant.
  response: Designing questions that contain zero digits in a variety of positions.
</misconception>
<misconception>
  Unit: Estimation and rounding
  Year: Year 8
  Content:
  misconception: Assuming all zero digits are not significant.
  response: Designing questions that contain zero digits in a variety of positions.
</misconception>
<misconception>
  Unit: Estimation and rounding
  Year: Year 8
  Content:
  misconception: Rounding prematurely during multi-step calculations.
  response: Encourage the use of fractions (where possible) or the use of the 'ANS' button.
</misconception>
<misconception>
  Unit: Estimation and rounding
  Year: Year 8
  Content:
  misconception: Division by 0.5 is the same as doubling.
  response: Reiterate the division of a number is the same as the multiplication of the reciprocal e.g  The division of 0.5 is the same as multiplying by 2. e.g The division of 0.1 is the same as multiplying by 10.
</misconception>
<misconception>
  Unit: Estimation and rounding
  Year: Year 8
  Content:
  misconception: When rounding a number, pupils write the first significant digit(s). e.g 36 789 is 4.
  response: The use of the place value table shows the magnitude of the number, thus preserving their place value. 
</misconception>
<misconception>
  Unit: Estimation and rounding
  Year: Year 8
  Content:
  misconception: When truncating, pupils are tempted to round. Also, when truncating, they cut off the number without thinking about the magnitude.
  response: The use of the place value table shows the magnitude of the number, thus preserving their place value when truncating.
</misconception>
<misconception>
  Unit: Estimation and rounding
  Year: Year 8
  Content:
  misconception: When subtracting or dividing, the largest value is found by subtracting or dividing the largest rounded number by the largest rounded divisor or additive inverse.
  response: Drawing a number line to show the subtraction of the smallest number will help students see how to achieve an overestimate or underestimate. When using division, reiterating the division of number is the same as multiplying by its reciprocal.
</misconception>
<misconception>
  Unit: Estimation and rounding
  Year: Year 8
  Content:
  misconception: Rounding prematurely during multi-step calculations.
  response: Encourage to use of fractions (where possible) or the use of the ANS button.
</misconception>
<misconception>
  Unit: Estimation and rounding
  Year: Year 8
  Content:
  misconception: Incorrect use of the error interval i.e $$a ≤ x ≤ b$$ or writing the error interval as $$a ≤ x > b$$
  response: As a check, encourage students to round the upper limit interval by the degree of accuracy to see if it evaluates to the rounded number.  Also,  draw a number line to show the meaning of  $$a ≤ x > b$$ and allow students to see the error.
</misconception>
<misconception>
  Unit: Estimation and rounding
  Year: Year 8
  Content:
  misconception: When subtracting or dividing, the largest value is found by subtracting or dividing the upper limit of a number by the upper limit of the divisor or additive inverse.
  response: Drawing a number line to show  with subtraction will help students see how to achieve an upper or lower limits of an error interval calculation. When using division, reiterating the division of number is the same as multiplying by its reciprocal.
</misconception>
<misconception>
  Unit: Estimation and rounding
  Year: Year 8
  Content:
  misconception: Using the wrong limits when dividing or subtracting in order to find the upper limit of a calculation or lower limit of a calculation. 
  response: Drawing a number line to show with subtraction will help students see how to achieve an upper or lower limits of an error interval calculation. When using division, reiterating the division of number is the same as multiplying by its reciprocal.
</misconception>
<misconception>
  Unit: Geometrical properties: polygons
  Year: Year 8
  Content:
  misconception: In order for two angles to be supplementary, they must both lie about a point on a straight line.
  response: For two angles to be supplementary, they must sum to 180°. They do not also need to both lie on a straight line.
</misconception>
<misconception>
  Unit: Geometrical properties: polygons
  Year: Year 8
  Content:
  misconception: Angles on a straight line sum to 180°
  response: Angles on a straight line only sum to 180° if all of those angles share a common vertex. Show two angles "on a line" at different points.
</misconception>
<misconception>
  Unit: Geometrical properties: polygons
  Year: Year 8
  Content:
  misconception: The horizontal side length of an isosceles triangle is always the base side.
  response: The base side of an isosceles triangle can have any orientation. It is important to look at the hash marks, angle markers, or measurements.
</misconception>
<misconception>
  Unit: Geometrical properties: polygons
  Year: Year 8
  Content:
  misconception: I can draw a 7 cm line with my ruler.
  response: A line is a linear path that continues forever in both directions. We can draw line segments with a ruler, which have distinct endpoints.
</misconception>
<misconception>
  Unit: Geometrical properties: polygons
  Year: Year 8
  Content:
  misconception: Transversals must intersect a pair of parallel lines.
  response: Transversals can intersect any set of lines or line segments, no matter whether any of those lines or line segments are parallel or not.
</misconception>
<misconception>
  Unit: Geometrical properties: polygons
  Year: Year 8
  Content:
  misconception: Referring to alternate angles as 'Z' angles because of the arrangement of the lines.
  response: Modelling the justification correctly through every example and using exterior alternate angles to highlight the limitations of 'Z' angles.
</misconception>
<misconception>
  Unit: Geometrical properties: polygons
  Year: Year 8
  Content:
  misconception: Pupils may believe that the co-interior angles are equal, like alternate and corresponding angles.
  response: Have pupils draw a pair of parallel lines and a transversal line themselves, identify the co-interior angles, are they equal?
</misconception>
<misconception>
  Unit: Geometrical properties: polygons
  Year: Year 8
  Content:
  misconception: Pupils may struggle with the justifications rather than getting to the answer.
  response: Keep asking pupils "why?" and encourage them to ask themselves, whenever they are working out an angle. 
</misconception>
<misconception>
  Unit: Geometrical properties: polygons
  Year: Year 8
  Content:
  misconception: Pupils may struggle with mathematical proof, especially using other knowledge within it.
  response: Explain to pupils that there are many different styles of mathematical proof but all are showing that a particular fact holds true for all.
</misconception>
<misconception>
  Unit: Geometrical properties: polygons
  Year: Year 8
  Content:
  misconception: Assuming triangles are certain types because of how they look.
  response: Unless there is notation or it has stated the type of triangle you cannot assume.
</misconception>
<misconception>
  Unit: Geometrical properties: polygons
  Year: Year 8
  Content:
  misconception: When splitting a polygon into triangles, pupils may draw line segments that cross inside the shape.
  response: By choosing a single common vertex for all the triangles, the line segments will not cross inside the shape.
</misconception>
<misconception>
  Unit: Geometrical properties: polygons
  Year: Year 8
  Content:
  misconception: Interior angles always sum to 180 times the number of component triangles it is split into.
  response: If line segments drawn make new vertices in the polygon, its angles won't contribute to the sum of interior angles in the initial polygon.
</misconception>
<misconception>
  Unit: Geometrical properties: polygons
  Year: Year 8
  Content:
  misconception: The exterior angle is the entire reflex angle that is on the outside of each vertex of a shape.
  response: Ask a pupil to stand and walk around the room to trace a shape. The angle that the pupil turns at each vertex is an exterior angle.
</misconception>
<misconception>
  Unit: Geometrical properties: polygons
  Year: Year 8
  Content:
  misconception: Pupils may solve angle problems by using methods which are less efficient than others.
  response: While less efficient methods are fine, encourage pupils to review their work each time they solve a problem to consider alternative methods.
</misconception>
<misconception>
  Unit: Geometrical properties: polygons
  Year: Year 8
  Content:
  misconception: Pupils may work out missing angles without writing out their justifications.
  response: Each time a number which is not on the original diagram is used or found, an explanation should be given for where it has come from.
</misconception>
<misconception>
  Unit: Geometrical properties: polygons
  Year: Year 8
  Content:
  misconception: Pupils might not know how to start an angle problem if they focus too much on the final solution.
  response: You can start an angle problem by working out any angle on the diagram. The more angles you work out, the easier the final solution becomes.
</misconception>
<misconception>
  Unit: Graphical representations of data
  Year: Year 8
  Content:
  misconception: Pupils may forget the key with a pictogram or mislabel the vertical scale for bar charts.
  response: By asking the pupils how they know there are 'x things', to highlight the need for the key.
</misconception>
<misconception>
  Unit: Graphical representations of data
  Year: Year 8
  Content:
  misconception: The icon that the pupils choose is too complicated to duplicate and cannot be divided well.
  response: Have the pupils try and find an icon with reflective symmetry and simple shapes.
</misconception>
<misconception>
  Unit: Graphical representations of data
  Year: Year 8
  Content:
  misconception: Pupils may label the vertical axis with the frequency values rather than a scale.
  response: Remind the pupils that the scale should go up in the same jumps. i.e. 0, 5, 10, 15 etc and have them check theirs.
</misconception>
<misconception>
  Unit: Graphical representations of data
  Year: Year 8
  Content:
  misconception: Pupils may select additional cells which will cause their chart to look strange.
  response: They can edit the data selected or delete the chart and start again.
</misconception>
<misconception>
  Unit: Graphical representations of data
  Year: Year 8
  Content:
  misconception: The frequencies on the frequency table are the angles you plot onto the pie chart.
  response: Challenge the misconception by using an example with frequencies that clearly add to more or less than 360 e.g. {90, 90, 180, 90, 60)
</misconception>
<misconception>
  Unit: Graphical representations of data
  Year: Year 8
  Content:
  misconception: 1) = not necessary to put into function, 2) students type in number to calculate, not click the cell
  response: 1) the = at the start tells the spreadsheet to start a calculation, 2) clicking the cell means if input data chances, outputs auto-update
</misconception>
<misconception>
  Unit: Graphical representations of data
  Year: Year 8
  Content:
  misconception: Two sectors on two different pie charts that have the same angle represent the same frequency.
  response: 90° of a pie chart of 4 data points represents less frequency (frequency of 1) than 90° of a pie chart of 200 data points (frequency of 50).
</misconception>
<misconception>
  Unit: Graphical representations of data
  Year: Year 8
  Content:
  misconception: Task B Q2 - Pupils may choose to go up in 100s on the vertical axis.
  response: Highlight that all of their data points will be in the bottom half of the graph and suggest going up in 50s.
</misconception>
<misconception>
  Unit: Graphical representations of data
  Year: Year 8
  Content:
  misconception: Pupils may struggle to assign the correct variable to the y-axis when graphing on a spreadsheet.
  response: Explain that the word "series" is used to mean the y-axis in this software.
</misconception>
<misconception>
  Unit: Graphical representations of data
  Year: Year 8
  Content:
  misconception: Pupils may assume that all there is always a connection between variables in scatter graphs.
  response: Emphasise examples showing no/weak connections, but explain that the tasks use data containing stronger connections for purpose of practice.
</misconception>
<misconception>
  Unit: Graphical representations of data
  Year: Year 8
  Content:
  misconception: Pupils may think that data is only presented using the types of graphs that they learn in school.
  response: Data can presented visually in anyway that helps people to understand it. Explore other types of graphs and infographics used in the media.
</misconception>
<misconception>
  Unit: Graphical representations of linear equations
  Year: Year 8
  Content:
  misconception: Where is coordinate (−2,5)? 2 down, 5 right from the origin? 5 right, 2 down from the origin?
  response: Coordinates in (<i>x,y</i>) form. −2 is <i>x</i>-instruction. From (0,0) will we travel in a positive or negative <i>x</i>-direction?
</misconception>
<misconception>
  Unit: Graphical representations of linear equations
  Year: Year 8
  Content:
  misconception: The plotted points of an arithmetic sequence form a line so we draw a line connecting them.
  response: Sequences are an ordered list and do not always need to follow a rule, so we often only find and use the positive integer term numbers. 
</misconception>
<misconception>
  Unit: Graphical representations of linear equations
  Year: Year 8
  Content:
  misconception: When plotting the sequence $$3n-1$$ using technology you need to type each coordinate individually.
  response: "We use technology to make things easier. There must be a quicker way!" Look for the 'table' function.
</misconception>
<misconception>
  Unit: Graphical representations of linear equations
  Year: Year 8
  Content:
  misconception: All graphs are linear and if graphs are not linear you join points with straight line segments. 
  response: Explore $$n+2, 2n$$ and $$x^2$$. "I see $$n$$ and 2; they must be similar" pupils think. Get them to compare numerically, then graphically.
</misconception>
<misconception>
  Unit: Graphical representations of linear equations
  Year: Year 8
  Content:
  misconception: Only equations in the form $$y=mx+c$$ are linear. All equations are linear.
  response: There are many forms that linear equations can take, however they always share a common feature. The variables have exponents of $$1$$.
</misconception>
<misconception>
  Unit: Graphical representations of linear equations
  Year: Year 8
  Content:
  misconception: The arithmetic sequence 5n+2 starts at 7 so the linear equation y=5x+2 'starts' somewhere.
  response: y=5x+2 has no start and no end; it goes on infinitely. However, all linear equations have a y-intercept and this helps define them.
</misconception>
<misconception>
  Unit: Graphical representations of linear equations
  Year: Year 8
  Content:
  misconception: Pupils count squares to calculate gradient instead of looking at scales.
  response: Encourage pupils to pick points on the graph to use to find the gradient and write down the coordinates rather than count squares. 
</misconception>
<misconception>
  Unit: Graphical representations of linear equations
  Year: Year 8
  Content:
  misconception: Pupils may think lines with gradients 2 and -2 are parallel. 
  response: Lines have to have the exact same gradient to be parallel. A line with a negative gradient will intersect a line with a positive gradient . 
</misconception>
<misconception>
  Unit: Graphical representations of linear equations
  Year: Year 8
  Content:
  misconception: When calculating gradient from coordinates, pupils get positive and negative gradients mixed up.
  response: Encourage pupils to sketch the coordinates first and then always look at a positive increase in x. 
</misconception>
<misconception>
  Unit: Graphical representations of linear equations
  Year: Year 8
  Content:
  misconception: Writing the y intercept as a single value or getting the x and y coordinates the wrong way around.
  response: Encourage writing the y intercept as a coordinate. Stating 'lines cross the y axis when x=0' can help pupils write the coordinate correctly.
</misconception>
<misconception>
  Unit: Graphical representations of linear equations
  Year: Year 8
  Content:
  misconception: Pupils may think graphs are only linear if written in the form y=mx+c
  response: Use the first learning cycle as an opportunity to show graphs in many formats. y=mx+c  makes the gradient and y intercept clear.
</misconception>
<misconception>
  Unit: Graphical representations of linear equations
  Year: Year 8
  Content:
  misconception: Writing the gradient as the constant and the y intercept as the coefficient of x.
  response: Link to linear sequences where the coefficient of n is the common difference in the sequence to help pupils see why (m) is the gradient.
</misconception>
<misconception>
  Unit: Graphical representations of linear equations
  Year: Year 8
  Content:
  misconception: To draw the graph using the gradient and intercept you can just count the squares.
  response: Encourage pupils to look at the scales on the axes carefully when drawing a line given the gradient and y-intercept. 
</misconception>
<misconception>
  Unit: Graphical representations of linear equations
  Year: Year 8
  Content:
  misconception: From the line $$y=x$$ to $$y=x+1$$ to $$y=x-1$$ the lines are moving left/right rather than up/down.
  response: It can be shown by using a $$(x,c)$$ coordinate in desmos. That coordinate moves up and down with the change in '$$c$$'.
</misconception>
<misconception>
  Unit: Graphical representations of linear equations
  Year: Year 8
  Content:
  misconception: There is one answer to everything in maths.
  response: We often see arithmetic and equations with one answer but, maths can be used to compare and justify multiple answers to a single problem.
</misconception>
<misconception>
  Unit: Numerical summaries of data
  Year: Year 8
  Content:
  misconception: Pupils may ignore a data point of zero in their calculation of the mean.
  response: Data points of zero will not add to the total but does impact the number of values, so the mean will be incorrect with its omission.
</misconception>
<misconception>
  Unit: Numerical summaries of data
  Year: Year 8
  Content:
  misconception: Pupils may divide by how many groups/bars there are, instead of the total frequency.
  response: By reminding students frequently that averages need to give a 'typical' value of the data set, ask them to sense check their mean value.
</misconception>
<misconception>
  Unit: Numerical summaries of data
  Year: Year 8
  Content:
  misconception: Pupils may confuse the position of the median with the median's actual value.
  response: Choose data where the position number would not be a reasonable median value and ensure pupils sense check their answers every time.
</misconception>
<misconception>
  Unit: Numerical summaries of data
  Year: Year 8
  Content:
  misconception: Pupils may choose the middle bar on the bar chart or the middle value on the x-axis as their median.
  response: Pull off the data from the bar chart or line graph to show where the median value is. 
</misconception>
<misconception>
  Unit: Numerical summaries of data
  Year: Year 8
  Content:
  misconception: Pupils may not understand what feature of a data set they're trying to find when identifying a mode
  response: Phrase the question as 'What is the modal colour?' for instance, rather than just 'What is the mode?'
</misconception>
<misconception>
  Unit: Numerical summaries of data
  Year: Year 8
  Content:
  misconception: Pupils may mistakenly choose the bars which have the same heights to be the mode.
  response: By reminding the pupils of the definition of the mode and asking the question in the context of the data, this should support students.
</misconception>
<misconception>
  Unit: Numerical summaries of data
  Year: Year 8
  Content:
  misconception: Pupils may often write the range as '3 to 10' or '10 - 3' rather than a single value.
  response: Remind pupils that the range is a single value which describes how far apart the extreme values are.
</misconception>
<misconception>
  Unit: Numerical summaries of data
  Year: Year 8
  Content:
  misconception: The mean is the most meaningful average. 
  response: Looking at bimodal data, trimodal data or data with extreme outliers. Context may be relevant. 
</misconception>
<misconception>
  Unit: Numerical summaries of data
  Year: Year 8
  Content:
  misconception: Averages (mean, median, mode) will always change if a data point needs to be added, removed, edited.
  response: The mean, median, or mode will remain invariant if a data point is added with the same value as that average.
</misconception>
<misconception>
  Unit: Numerical summaries of data
  Year: Year 8
  Content:
  misconception: "Adding or removing a data point from a dataset will always change the value of the range"
  response: The range only changes if: the data point added becomes a new max or min value, or the data point removed is the current max or min value.
</misconception>
<misconception>
  Unit: Numerical summaries of data
  Year: Year 8
  Content:
  misconception: Pie charts but not bar charts can show what proportion of a dataset a particular subgroup represents
  response: You can figure out proportion from a bar chart by comparing the frequency of one subgroup to the total frequency, by adding heights of bars.
</misconception>
<misconception>
  Unit: Numerical summaries of data
  Year: Year 8
  Content:
  misconception: If two datasets have the same mean, then the distribution of data points will look similar.
  response: Even with the same mean, two datasets could have vastly different ranges. One dataset could be bimodal, whilst the other could be unimodal.
</misconception>
<misconception>
  Unit: Numerical summaries of data
  Year: Year 8
  Content:
  misconception: The mean and median will always be close to the most frequent values (or peaks) in a dataset.
  response: The mean and median may be at the lower or lowest frequency parts of a distribution. This is especially likely if the data is bimodal.
</misconception>
<misconception>
  Unit: Numerical summaries of data
  Year: Year 8
  Content:
  misconception: Correlation always means that one of the variables is affecting the other variable.
  response: Correlation only suggests variables may be related somehow. Show examples where variables correlate because they both depend on population.
</misconception>
<misconception>
  Unit: Numerical summaries of data
  Year: Year 8
  Content:
  misconception: The word 'population' always refers to the entire population of a country or the world.
  response: The population in a given context is defined by the entire set of people/creatures/items that are being considered.
</misconception>
<misconception>
  Unit: Numerical summaries of data
  Year: Year 8
  Content:
  misconception: Either the mean, median or mode could be used as an average in any situation.
  response: The choice of average can depend on the type of data. For example, in a list of colours, you can find the mode but not the mean.
</misconception>
<misconception>
  Unit: Numerical summaries of data
  Year: Year 8
  Content:
  misconception: You always need to start the axis of a scatter graph at (0,0).
  response: The axis of a scatter graph should use a scale that makes the points as clear to see as possible, without distorting the shape of the data.
</misconception>
<misconception>
  Unit: Numerical summaries of data
  Year: Year 8
  Content:
  misconception: The findings for a data investigation using a sample can always be generalised to the population.
  response: The generalisability of results can depend on how representative the sample is of the population which it is being compared to.
</misconception>
<misconception>
  Unit: Numerical summaries of data
  Year: Year 8
  Content:
  misconception: Reporting two averages when asked to make two comparisons between sets of data.
  response: Mean, media and mode essentially measure the same thing: central tendency. So use one of the comparisons to comment on the spread of data. 
</misconception>
<misconception>
  Unit: Perimeter, area and volume
  Year: Year 8
  Content:
  misconception: Summing all of the given lengths and only the given lengths to find the perimeter.
  response: With each example discuss which lengths are part of the perimeter, which lengths are not and whether any lengths are equal to others.
</misconception>
<misconception>
  Unit: Perimeter, area and volume
  Year: Year 8
  Content:
  misconception: Pupils may find the area by multiplying lengths which are not perpendicular.
  response: Area is measured in square units. The base and height of a square are perpendicular. We multiply perpendicular lengths to make square units.
</misconception>
<misconception>
  Unit: Perimeter, area and volume
  Year: Year 8
  Content:
  misconception: Pupils may think that the π symbol represents a variable, similar to letters such as r and d.
  response: Reiterate the difference between variables and constants. Explain that while the radius may differ between circles, π is always the same.
</misconception>
<misconception>
  Unit: Perimeter, area and volume
  Year: Year 8
  Content:
  misconception: When writing answers in terms of π, pupils may think that π is the units.
  response: π is a constant and makes up part of the numerical component of the answer. Units (such as square metres) still need to be stated.
</misconception>
<misconception>
  Unit: Perimeter, area and volume
  Year: Year 8
  Content:
  misconception: Pupils may confuse the formula for area with the 2πr version of the formula for circumference.
  response: Area is a 2-dimensional space so its formula requires the multiplication of two lengths. This happens when we square the radius.
</misconception>
<misconception>
  Unit: Perimeter, area and volume
  Year: Year 8
  Content:
  misconception: When calculating the diameter, pupils may use rounded numbers to perform subsequent calculations.
  response: Repeat one of the demonstrations of finding the diameter but round each decimal as they appear and compare the accuracy of the final answer.
</misconception>
<misconception>
  Unit: Perimeter, area and volume
  Year: Year 8
  Content:
  misconception: To find the area of a quarter-circle divide the radius by 4 to use as part of the calculation.
  response: You must divide the area by 4, not the radius. The radius gets squared when calculating area so the division of r would be applied twice.
</misconception>
<misconception>
  Unit: Perimeter, area and volume
  Year: Year 8
  Content:
  misconception: Shapes with the same area also have the same perimeter.
  response: Demonstrate that component parts being rearranged has no effect on its area, but may affect its perimeter. 
</misconception>
<misconception>
  Unit: Perimeter, area and volume
  Year: Year 8
  Content:
  misconception: If I want to find the radius of a semicircle from its area, I half the area first.
  response: You must double the area. This calculates the area of a full circle, whose radius can be found by first dividing by π, then square rooting.
</misconception>
<misconception>
  Unit: Perimeter, area and volume
  Year: Year 8
  Content:
  misconception: Any arrangement of 6 square-faces will result in the net of a cube.
  response: Some arrangements of 6 squares will result in some of them overlapping when the shape is folded into 3D, resulting in an incomplete cube.
</misconception>
<misconception>
  Unit: Perimeter, area and volume
  Year: Year 8
  Content:
  misconception: I can tell a 3D shape is a prism because the 2D faces on both ends are congruent.
  response: The cross-sectional face must be the same throughout, not just at the two ends of the shape. Also, the two end faces must be parallel.
</misconception>
<misconception>
  Unit: Perimeter, area and volume
  Year: Year 8
  Content:
  misconception: Pupils may try to avoid sketching of nets or faces and in turn miss information. 
  response: Reassure pupils that a sketch does not need to be perfect and just needs to convey the key information.
</misconception>
<misconception>
  Unit: Perimeter, area and volume
  Year: Year 8
  Content:
  misconception: Pupils may overlook whether they have been given the diameter or radius of the circles. 
  response: Encourage pupils to always write down the radius before any calculation of the surface area is started.
</misconception>
<misconception>
  Unit: Perimeter, area and volume
  Year: Year 8
  Content:
  misconception: Pupils may multiply all lengths on the diagram rather than find the area of the cross-section.
  response: Draw the cross-sectional polygon out, find the area and then multiply by the length of the prism.
</misconception>
<misconception>
  Unit: Perimeter, area and volume
  Year: Year 8
  Content:
  misconception: Pupils may multiply the length and radius before squaring.
  response: Remind students of the order of operations and link to the volume of a prism formula: finding the area of the cross-section first.
</misconception>
<misconception>
  Unit: Perimeter, area and volume
  Year: Year 8
  Content:
  misconception: Pupils may struggle to decide whether the question is needing length, area or volume.
  response: Support could be given by providing the units for the answer or pupils may be encouraged to think of contexts for each before hand.
</misconception>
<misconception>
  Unit: Sequences
  Year: Year 8
  Content:
  misconception: Pupils may struggle to divide values correctly to find a multiplier, especially when fractional.
  response: Pupils should write their sequence out with arrows to show which direction their multiplier is operating.
</misconception>
<misconception>
  Unit: Sequences
  Year: Year 8
  Content:
  misconception: That sequences can only have constant additive or multiplicative patterns.
  response: Give students two numbers and get them to carry the sequence on in different ways. Anything they come up with can be a sequence.
</misconception>
<misconception>
  Unit: Sequences
  Year: Year 8
  Content:
  misconception: Pupils can mix up describing how patterns grow or the relationships between objects in the pattern.
  response: Pupils should verbalise their description, using the keyword 'term' , making it clear which way they are describing their pattern.
</misconception>
<misconception>
  Unit: Sequences
  Year: Year 8
  Content:
  misconception: The difference in the given terms divided by the number of missing terms gives the common difference
  response: Write the sequence out with gaps for the missing terms. Model how many additions (jumps) to get from one known term to the next.
</misconception>
<misconception>
  Unit: Sequences
  Year: Year 8
  Content:
  misconception: The position-to-term rule is the initial term add the common difference.
  response: Once pupils have found the additive pattern get them to write each term as a value add the difference.
</misconception>
<misconception>
  Unit: Sequences
  Year: Year 8
  Content:
  misconception: Sequences such as triangular numbers which have a linear sequence in their differences are linear.
  response: Terms in an arithmetic sequence have to have a common first difference. 
</misconception>
<misconception>
  Unit: Sequences
  Year: Year 8
  Content:
  misconception: That $$n$$ is a term in the sequence. That $$n=10$$ means 10 is in the sequence.
  response: Reiterate that $$n$$ is the term number. "$$n=10$$ means the 10th term. What is the 10th term number?"
</misconception>
<misconception>
  Unit: Sequences
  Year: Year 8
  Content:
  misconception: That the sequence $$3n+2$$ starts with 3 and adds 2, or starts with 2 and adds 3.
  response: Calculate the first few terms. Ask, "When $$n = 1$$ what is the term value?" This is the first value for our sequence.
</misconception>
<misconception>
  Unit: Sequences
  Year: Year 8
  Content:
  misconception: That the sequence 6,11,16,21, ... is 5n+6 because it goes up by 5 and starts at 6.
  response: Compare 6,11,16,21, ... to 5,10,15,20, ... "What is the shift? The translation? If that is 5n then this is 5n with how much more?"
</misconception>
<misconception>
  Unit: Sequences
  Year: Year 8
  Content:
  misconception: When plotting sequences, a line must be drawn through the points.
  response: Plot (1,5), (2,10), (3,15), draw a line and find other coordinates. When n = 1.5 the term value is 7.5. Is 7.5 in the sequence 5n??
</misconception>
<misconception>
  Unit: Sequences
  Year: Year 8
  Content:
  misconception: It is impossible to tell if 174 368 is in the sequence -8,-3,2,7, ...
  response: Generalising the rule for forming a given sequence can help us see if a value is in the sequence.
</misconception>
<misconception>
  Unit: Sequences
  Year: Year 8
  Content:
  misconception: The answer to the 'handshake' problem is 15, or 15x15
  response: Group pupils into 3s and ask them to record how many handshakes are made. Then group as 4s and repeat. What do they notice?
</misconception>
<misconception>
  Unit: Solving linear equations
  Year: Year 8
  Content:
  misconception: When converting English to algebra, pupils can mix up 4x + 2 and 4(x + 2) 
  response: Reviewing priority of operations and expanding brackets may be helpful. The multiplier operates on all terms in the bracket.
</misconception>
<misconception>
  Unit: Solving linear equations
  Year: Year 8
  Content:
  misconception: Trying to double an expression and only doubling one term.
  response: Use the numerical examples to show why this does not work. Use of brackets in working out is also helpful.
</misconception>
<misconception>
  Unit: Solving linear equations
  Year: Year 8
  Content:
  misconception: Pupils may think all equations are for straight lines so can be plotted from 2 points.
  response: Explore different relationships, most relationships are not linear but we focus a lot on linear relationships and their unique structure.
</misconception>
<misconception>
  Unit: Solving linear equations
  Year: Year 8
  Content:
  misconception: 10 - x = 2 means that 2 - x = 10
  response: Using bar models can help pupils understand rearranging additive relationships at an early stage.
</misconception>
<misconception>
  Unit: Solving linear equations
  Year: Year 8
  Content:
  misconception: When reading solutions from a graph pupils may read the solution as the y-coordinate.
  response: The solution to the equation is the value of the variable that makes both sides balance.
</misconception>
<misconception>
  Unit: Solving linear equations
  Year: Year 8
  Content:
  misconception: Pupils may think a value has to be added to each term in an expression.
  response: When adding a term to an expression we can write it as a single addition and then collect like terms if necessary. Show with numbers first
</misconception>
<misconception>
  Unit: Solving linear equations
  Year: Year 8
  Content:
  misconception: When solving x - 5 = 10 pupils may see the -5 and calculate 10 - 5 = 5 
  response: Focus on understanding zero pairs and why adding the additive inverse gives the solution. Bar models are a helpful representation here.
</misconception>
<misconception>
  Unit: Solving linear equations
  Year: Year 8
  Content:
  misconception: When solving equations pupils may not use the inverse operation.
  response: Working out should include each step then pupils can check each step using substitution.
</misconception>
<misconception>
  Unit: Solving linear equations
  Year: Year 8
  Content:
  misconception: Pupils can be unsure which values to add and which to subtract when collecting like terms.
  response: Rewrite the equation with like terms grouped together before combining like terms.
</misconception>
<misconception>
  Unit: Solving linear equations
  Year: Year 8
  Content:
  misconception: That there is only one way to solve any given equation.
  response: In maths we will often see multiple ways to solve the same one problem. To be able to use multiple methods is a demonstration of fluency.
</misconception>
<misconception>
  Unit: Solving linear equations
  Year: Year 8
  Content:
  misconception: To subtract from both the variable and numerical terms when subtracting from both sides.
  response: To subtract $$2$$ from $$5x+3$$ leaves $$5x+1$$, not $$3x+1$$. Use visual representations like balance scales and bar models to show this.
</misconception>
<misconception>
  Unit: Solving linear equations
  Year: Year 8
  Content:
  misconception: That "$$x$$ times five, plus three" is the same as "$$x$$ plus three, times five".
  response: Use visual representations to demonstrate why and how they are different. Use algebra tiles if you have them, or get pupils to draw them.
</misconception>
<misconception>
  Unit: Solving linear equations
  Year: Year 8
  Content:
  misconception: That all brackets have to be expanded before we solve an equation with brackets it in.
  response: How would you solve $$2y=50$$? You would divide both sides by $$2$$. So why not start with 'divide $$2$$' when solving $$2(y-7)=50$$?
</misconception>
<misconception>
  Unit: Solving linear equations
  Year: Year 8
  Content:
  misconception: That there is only one way to solve any given equation.
  response: In maths we will often see multiple ways to solve the same one problem. To be able to use multiple methods is a demonstration of fluency.
</misconception>
<misconception>
  Unit: Solving linear equations
  Year: Year 8
  Content:
  misconception: That we always have to use written methods to solve equations.
  response: Use Desmos to show that equations like $$3x-1=17$$ and $$3x-1=x+9$$ can be solved by drawing both lines and finding the intersection.
</misconception>
<misconception>
  Unit: Solving linear equations
  Year: Year 8
  Content:
  misconception: That algebra, in particular solving equations, is abstract and not related to the world around us.
  response: Ask pupils to solve $$4(x+3)=20$$. Then show a square with length $$x+3$$, tell them the perimeter is $$20$$ and ask them to find $$x$$.
</misconception>
<misconception>
  Unit: Understanding multiplicative relationships: percentages and proportionality
  Year: Year 8
  Content:
  misconception: When finding 10% we divide by 10, so when finding 5% we divide by 5.
  response: Use a bar model to show the division of 10 means  one tenth of the amount. When dividing by 5 it means one fifth has been found.
</misconception>
<misconception>
  Unit: Understanding multiplicative relationships: percentages and proportionality
  Year: Year 8
  Content:
  misconception: When finding 10% we divide by 10, so when finding 5% we divide by 5.
  response: Use a bar model to show the division of 10 means  one tenth of the amount. When dividing by 5 it means one fifth has been found.
</misconception>
<misconception>
  Unit: Understanding multiplicative relationships: percentages and proportionality
  Year: Year 8
  Content:
  misconception: Incorrectly drawing a scaled axis is common.
  response: Use the approach where pupils count the number of intervals of the scale and divide the difference bewteen the intervals. For example, if there are 5 intervals and the difference is between 20 and 30, they divide 10 by 2, so each interval is 2
</misconception>
<misconception>
  Unit: Understanding multiplicative relationships: percentages and proportionality
  Year: Year 8
  Content:
  misconception: Incorrectly drawing a scaled axis is common.
  response: Use the approach where pupils count the number of intervals of the scale and divide the difference bewteen the intervals. For example, if there are 5 intervals and the difference is between 20 and 30, they divide 10 by 2, so each interval is 2.
</misconception>
<misconception>
  Unit: Understanding multiplicative relationships: percentages and proportionality
  Year: Year 8
  Content:
  misconception: A single digit percentage is incorrectly worked out by dividing by 10 and not 100 e.g 3% = 0.3 
  response: Two responses can be used to remind students that to covert a percentage into a decimal;  we divide by 100; using 3%, ask what 30% is as a decimal and 3% as a decimal. Pupils realise they cannot be the same. A place value chart also helps. 
</misconception>
<misconception>
  Unit: Understanding multiplicative relationships: percentages and proportionality
  Year: Year 8
  Content:
  misconception: A single digit percentage is incorrectly worked out by dividing by 10 and not 100 e.g 3% = 0.3 
  response: Two responses can be used to remind students that to covert a percentage into a decimal;  we divide by 100; using 3%, ask what 30% is as a decimal and 3% as a decimal. Pupils realise they cannot be the same. A place value chart also helps. 
</misconception>
<misconception>
  Unit: Understanding multiplicative relationships: percentages and proportionality
  Year: Year 8
  Content:
  misconception: A single digit percentage is incorrectly worked out by dividing by 10 and not 100 e.g 3% = 0.3. This error continues when increasing amounts e.g increase 40 by 3% has a multiplier of 1.3
  response: Remind pupils that to covert a percentage into a decimal we divide by 100. This applies with increase too e.g 120% has a multiplier of 1.2
</misconception>
<misconception>
  Unit: Understanding multiplicative relationships: percentages and proportionality
  Year: Year 8
  Content:
  misconception: Pupil can often get confused with increasing and decreasing an amount e.g Increase 45 by 23% and decreasing 45 by 23% have the same multiplier. 
  response: Encourage students to draw double number lines or ratio tables so they can see the increase and multiplier or decrease and multiplier. 
</misconception>
<misconception>
  Unit: Understanding multiplicative relationships: percentages and proportionality
  Year: Year 8
  Content:
  misconception: A single digit percentage is incorrectly worked out by dividing by 10 and not 100 e.g 3% = 0.3. This error continues when increasing amounts e.g increase 40 by 3% has a multiplier of 1.3
  response: Remind pupils that to covert a percentage into a decimal we divide by 100. This applies with increase too e.g 120% has a multiplier of 1.2
</misconception>
<misconception>
  Unit: Understanding multiplicative relationships: percentages and proportionality
  Year: Year 8
  Content:
  misconception: A single digit percentage is incorrectly worked out by dividing by 10 and not 100 e.g 3% = 0.3. This error continues when increasing amounts e.g increase 40 by 3% has a multiplier of 1.3
  response: Remind pupils that to covert a percentage into a decimal we divide by 100. This applies with increase too e.g 120% has a multiplier of 1.2
</misconception>
<misconception>
  Unit: Understanding multiplicative relationships: percentages and proportionality
  Year: Year 8
  Content:
  misconception: Forgetting to find the percentage change.
  response: Emphasise the word change. Encourage pupils to write down the 2 percentages with their relevant values.  Go back to the question and calculate the actual change they should notice that this is neither of the 2 values but the difference between them.
</misconception>
<misconception>
  Unit: Understanding multiplicative relationships: percentages and proportionality
  Year: Year 8
  Content:
  misconception: Incorrectly drawing or interpreting the scales on axes.
  response: Use the approach where pupils count the number of intervals of the scale and divide the difference between the intervals. For example, if there are 5 intervals and the difference is between 20 and 30, they divide 10 by 2, so each interval is 2
</misconception>
<misconception>
  Unit: Understanding multiplicative relationships: percentages and proportionality
  Year: Year 8
  Content:
  misconception: Assuming that any graph with a constant positive gradient represents variables that are in direct proportion.
  response: Encourage the useful check of reading a pairs of values from the graph, doubling one of them and checking the graph to see if the other variable has doubled.  If it has it shows a directly proportional relationship if not it doesn't.
</misconception>
<misconception>
  Unit: Understanding multiplicative relationships: percentages and proportionality
  Year: Year 8
  Content:
  misconception: Assuming that to convert 1 metre squared to cm squared you multiply by 100 and not 10 000
  response: Encourage any pupil who initially finds this challenging to ensure that the values are in the required unit for the answer before doing the calculation. 
</misconception>
<misconception>
  Unit: Understanding multiplicative relationships: percentages and proportionality
  Year: Year 8
  Content:
  misconception: The graph representing a inversely proportional relationship is of the form x + y = a and will eventually meet the axes.
  response: The dimensions of the rectangle are ideal for highlighting this, particularly the latter part as a you cannot have a rectangle with a length of 0 cm.
</misconception>
<misconception>
  Unit: Understanding multiplicative relationships: percentages and proportionality
  Year: Year 8
  Content:
  misconception: Forgetting to find the percentage change.
  response: Emphasise the word change. Encourage pupils to write down the 2 percentages with their relevant values.  Go back to the question and calculate the actual change they should notice that this is neither of the 2 values but the difference between them.
</misconception>
<misconception>
  Unit: Expressions and formulae
  Year: Year 9
  Content:
  misconception: Pupils forget to multiply every term in the bracket by the term outside the bracket.
  response: Remind pupils about the distributive law with numerical examples, e.g. 4(3 + 7) and show that this is not equivalent to 12 + 7. Using algebra tiles can also help pupils to make sense of this skill. 
</misconception>
<misconception>
  Unit: Expressions and formulae
  Year: Year 9
  Content:
  misconception: If equations contain brackets you always need to expand them before solving. 
  response: Try to encourage pupils to use their factors and multiples knowledge to decide if it is more efficient to expand first or not.
</misconception>
<misconception>
  Unit: Expressions and formulae
  Year: Year 9
  Content:
  misconception: Missing out partial products 
  response: Relating back to numerical examples and showing that 12 × 34 is not just 10 × 30 + 2 × 4. Using algebra tiles and area models can help to support student's understanding. 
</misconception>
<misconception>
  Unit: Expressions and formulae
  Year: Year 9
  Content:
  misconception: Squaring a binomial is the same as just squaring each term. This can then cause confusion with difference of two squares where expanding a pair of binomials does result in just two terms.
  response: Using an area model and taking time to check the partial products each time, particularly with negative terms, should help students to check if they have expanded correctly. 
</misconception>
<misconception>
  Unit: Expressions and formulae
  Year: Year 9
  Content:
  misconception: Mistakes with partial products are even more common where algebraic terms in the binomials have coefficients greater than 1. It is common to find pupils writing that the product of 2x and 3x is 5x
  response: Reminding pupils that because multiplication is commutative the product of 2x and 3x can be thought of as 2 × 3 × x × x
</misconception>
<misconception>
  Unit: Expressions and formulae
  Year: Year 9
  Content:
  misconception: Rearranging equations means you can just swap where terms are. 
  response: Remind pupils that subtraction and division are not commutative so swapping the order will matter. 
</misconception>
<misconception>
  Unit: Expressions and formulae
  Year: Year 9
  Content:
  misconception: Rather than learning to rearrange multiplicative relationships pupils can just learn the rearrangements or use a trick. 
  response: There are many situations in school and out where this skill is valuable and understanding how to manipulate these relationships will help pupils to understand the mathematics rather than just learn a set of procedures or lots of formulae. 
</misconception>
<misconception>
  Unit: Expressions and formulae
  Year: Year 9
  Content:
  misconception: The subject of a formula is just the first term in the formula.
  response: Draw attention to the variety of equations and formulae used in the lesson.
</misconception>
<misconception>
  Unit: Expressions and formulae
  Year: Year 9
  Content:
  misconception: The subject of a formula is just the first term in the formula.
  response: Draw attention to the variety of equations and formulae used in the lesson.
</misconception>
<misconception>
  Unit: Expressions and formulae
  Year: Year 9
  Content:
  misconception: That the gradient of a line given the equation of the line is always just the coefficient of the x term. 
  response: Using graphing software to explore this could help. 
</misconception>
<misconception>
  Unit: Expressions and formulae
  Year: Year 9
  Content:
  misconception: Changing the subject of an equation or formula is only done when you are told to.
  response: Having students practise rearranging before substituting and vice versa allows them to decide when the skill could be useful. 
</misconception>
<misconception>
  Unit: Expressions and formulae
  Year: Year 9
  Content:
  misconception: When subtracting expression pupils forget to subtract both terms from the second espression.
  response: Watch out for mistakes with negatives here. Pupils should find it much easier to re-write subtractions as additions of additive inverses and that way they only need to add. 
</misconception>
<misconception>
  Unit: Geometrical properties: similarity and Pythagoras' theorem
  Year: Year 9
  Content:
  misconception: When a pair of similar shapes are not in the same orientation, pupils may select an incorrect pair of lengths to calculate the scale factor.
  response: Encourage pupils to take a systematic approach to locating pairs of corresponding lengths by looking for the longest edge in each shape, then the second longest, third longest, etc.
</misconception>
<misconception>
  Unit: Geometrical properties: similarity and Pythagoras' theorem
  Year: Year 9
  Content:
  misconception: Pupils may find it difficult to match up corresponding measurements on two congruent shapes when they are in different orientations.
  response: Look lengths which are between any pairs of known angles or look for angles which are between pairs of adjacent  known lengths. Also, tracing paper could be used to reflect/rotate/translate one shape onto the other.
</misconception>
<misconception>
  Unit: Geometrical properties: similarity and Pythagoras' theorem
  Year: Year 9
  Content:
  misconception: Pupils may find it difficult to match up corresponding measurements on two congruent shapes when they are in different orientations.
  response: Look lengths which are between any pairs of known angles or look for angles which are between pairs of adjacent  known lengths. Also, tracing paper could be used to reflect/rotate/translate one shape onto the other.
</misconception>
<misconception>
  Unit: Geometrical properties: similarity and Pythagoras' theorem
  Year: Year 9
  Content:
  misconception: Pupils may think that they do not have enough information about a shape to determine whether it is congruent to another shape, when in fact they do.
  response: Pupils could attempt the draw the shape based on the information that they have. They can then consider whether there are multiple way that the shape can be drawn while still satisfying all the given information.
</misconception>
<misconception>
  Unit: Geometrical properties: similarity and Pythagoras' theorem
  Year: Year 9
  Content:
  misconception: Pupils may mix up the meanings of congruence and similarity or struggle with the hierarchy of their nested sets (e.g. thinking that all similar shapes are congruent rather than the other way around).
  response: Frequently refer to a Venn diagram showing the set of congruence shapes inside the set of similar shapes when examining pairs of shapes.
</misconception>
<misconception>
  Unit: Geometrical properties: similarity and Pythagoras' theorem
  Year: Year 9
  Content:
  misconception: When rotating a shape to count its order of rotational symmetry, pupils may count the starting position twice: once at the start and then again at the end of the full turn.
  response: Encourage pupils to be consistent with when they count the starting position, either always counting it before they begin rotating the shape or always counting it at the end of the full turn.
</misconception>
<misconception>
  Unit: Geometrical properties: similarity and Pythagoras' theorem
  Year: Year 9
  Content:
  misconception: Pupils may believe that as the sides fix the angles, that this implies it is true conversely. 
  response: Use any regular polygon to highlight that the angles will always be the same, but the edge lengths are not always the same length. Regular polygons are always similar but not necessarily congruent.
</misconception>
<misconception>
  Unit: Geometrical properties: similarity and Pythagoras' theorem
  Year: Year 9
  Content:
  misconception: Pupils may believe that the angle doesn't need to be in between the two known sides.
  response: Use the Geogebra files to demonstrate that more than one triangle can be formed at times, and therefore it does not guarantee congruence between two triangles.
</misconception>
<misconception>
  Unit: Geometrical properties: similarity and Pythagoras' theorem
  Year: Year 9
  Content:
  misconception: Pupils may struggle to spot congruent triangles if they only look for ASA. 
  response: Encourage pupils to add any further information to diagrams, like the third angle, before starting to prove congruence.
</misconception>
<misconception>
  Unit: Geometrical properties: similarity and Pythagoras' theorem
  Year: Year 9
  Content:
  misconception: Pupils may make assumptions about diagrams containing a right angle incorrectly.
  response: Remind pupils, that they cannot assume there is a right angle, just because it may look like the two edges are perpendicular to each other.
</misconception>
<misconception>
  Unit: Geometrical properties: similarity and Pythagoras' theorem
  Year: Year 9
  Content:
  misconception: Pupils may think they need to know the actual size or length to be able to prove congruence.
  response: Remind pupils that if they can show that the corresponding angles or sides are the same length, then that is all that is needed. For example, if the corresponding edges are both edges of the same regular polygon, then they will be the same.
</misconception>
<misconception>
  Unit: Geometrical properties: similarity and Pythagoras' theorem
  Year: Year 9
  Content:
  misconception: Pythagoras' theorem is just a relationship between the three sides of a right-angled triangle.
  response: Whilst this is true, Pythagoras' theorem can more visually be represented as three squares whose sides are equal in length to the three sides of the triangle. The sum of the areas of the two smaller squares is equal to the area of the larger square.
</misconception>
<misconception>
  Unit: Geometrical properties: similarity and Pythagoras' theorem
  Year: Year 9
  Content:
  misconception: Pythagorean triples can be a trio of any rational numbers that, when constructed into a triangle, always produces a right-angled triangle.
  response: Pythagorean triples are conventionally a trio of integer side lengths of a right-angled triangle, such as the 3, 4, 5 triangle. Other, similar triangles can be generated from Pythagorean triples, whose side lengths are rational, such as 0.3, 0.4, 0.5
</misconception>
<misconception>
  Unit: Geometrical properties: similarity and Pythagoras' theorem
  Year: Year 9
  Content:
  misconception: The method for finding the length of a shorter side of a right-angled triangle using Pythagoras' theorem is exactly the same as when finding the hypotenuse.
  response: Whilst the initial setup of "the sum of the squares of the two shorter sides equals the square of the hypotenuse" will be the same, finding the length of a shorter side will require an extra step of rearranging terms in the equation.
</misconception>
<misconception>
  Unit: Geometrical properties: similarity and Pythagoras' theorem
  Year: Year 9
  Content:
  misconception: I can only use Pythagoras' theorem to find the length of a side of a right-angled triangle when the right-angle marker is labelled, so I know which side is the hypotenuse.
  response: The right-angle marker doesn't need to be explicitly labelled in order to be able to identify the right-angle. You can use knowledge of "interior angles in a triangle sum to 180°" to find the right angle, given two other angles.
</misconception>
<misconception>
  Unit: Geometrical properties: similarity and Pythagoras' theorem
  Year: Year 9
  Content:
  misconception: I need to be given a triangle in order to use Pythagoras' theorem.
  response: You do not need to be given a triangle. It is an important skill to be able to sketch and label a triangle for yourself from given information, or go straight into an algebraic stage of calculation if aware that lengths given are perpendicular.
</misconception>
<misconception>
  Unit: Geometrical properties: similarity and Pythagoras' theorem
  Year: Year 9
  Content:
  misconception: Every question that has a right-angled triangle must use Pythagoras' theorem to be solved.
  response: It is easy to get into a habit of using Pythagoras' theorem when learning the topic, but it is likely you have seen several maths problems in the past with right-angled triangles, which ask to find areas and angles, without using Pythagoras' theorem.
</misconception>
<misconception>
  Unit: Graphical representations
  Year: Year 9
  Content:
  misconception: All sequences have to be arithmetic (linear) or geometric.
  response: There are many types of sequences; arithmetic and geometric are just two types.
</misconception>
<misconception>
  Unit: Graphical representations
  Year: Year 9
  Content:
  misconception: All sequences can go on infinitely.
  response: When we think abstractly and start a sequence such as 8, 10, 12, 14, 16, ... it is possible that it goes on infinitely. However, if we applied this sequence to a context such as pairs of pupils getting on a bus, then a physical limit will apply.
</misconception>
<misconception>
  Unit: Graphical representations
  Year: Year 9
  Content:
  misconception: After plotting the integer coordinate pairs of a quadratic, they should be joined with a straight line.
  response: Use graphing technology to plot coordinate pairs that use smaller and smaller non-integer steps between $$x$$-coordinates. This will reveal the true, curved nature of the line.
</misconception>
<misconception>
  Unit: Graphical representations
  Year: Year 9
  Content:
  misconception: Estimation and approximation are only required skills when working solely with number problems.
  response: In problem solving it can be really useful to sketch an approximation of a certain graph such as a linear equation. Seeing where the $$y$$-intercept is and drawing an approximate gradient could help us identify solutions.
</misconception>
<misconception>
  Unit: Graphical representations
  Year: Year 9
  Content:
  misconception: A table of values should always be filled in and all points plotted in order to graph a linear equation.
  response: A linear equation will form a straight line graph therefore we only need to know two points in order to draw the line.
</misconception>
<misconception>
  Unit: Graphical representations
  Year: Year 9
  Content:
  misconception: Since linear equations (typically) have one solution, all equations have one solution.
  response: Ask pupils to compare the graphical solution to a linear equation with the graphical solution to a quadratic equation. This will enable them to see that it is possible for a quadratic equation to have more than one solution.
</misconception>
<misconception>
  Unit: Graphical representations
  Year: Year 9
  Content:
  misconception: The line on a distance time graph can go in any direction.
  response: The line may be horizontal, time changing without a change in distance, but it can not be vertical. That would be a change in distance without a change in time. Additionally, our line cannot go backwards; time is always moving forwards.
</misconception>
<misconception>
  Unit: Graphical representations
  Year: Year 9
  Content:
  misconception: There is only one way to solve linear equations; by manipulation and isolating the variable(s).
  response: When we plot more than one linear equation on a graph we can use the intersection to find the solution.
</misconception>
<misconception>
  Unit: Graphical representations
  Year: Year 9
  Content:
  misconception: A distance time graph will always be constructed with straight lines.
  response: A straight line represents a consistent rate of a change, a consistent speed. In reality we need to model acceleration and deceleration which will involve curved lines.
</misconception>
<misconception>
  Unit: Non-linear relationships
  Year: Year 9
  Content:
  misconception: Pupils assume a sequence is arithmetic and only check the first few terms. 
  response: Encourage pupils to check all the terms of a sequence they are given to check that the pattern they think they have spotted is continuing. 
</misconception>
<misconception>
  Unit: Non-linear relationships
  Year: Year 9
  Content:
  misconception: Misinterpreting the values in an expression for the n^th term. For example, given the n^th term $$3n-5$$ pupils may think that this relates to a sequence that is decreasing by 5 each time
  response: Remind students about how the expression for the n^th term relates to multiples of a number (times tables) and then a shift. For example, 4, 9, 14, 19, ... can be seen as the 5 times table shifted down 1.
</misconception>
<misconception>
  Unit: Non-linear relationships
  Year: Year 9
  Content:
  misconception: After becoming very familiar with arithmetic sequences pupils can find the difference between the first two terms and just assume the sequence is arithmetic. 
  response: Explore a large number of geometric and arithmetic sequences and see if pupils can articulate how they check if a sequence is geometric. They might say the terms of the sequence grow more quickly (for some geometric sequences).
</misconception>
<misconception>
  Unit: Non-linear relationships
  Year: Year 9
  Content:
  misconception: After becoming very familiar with arithmetic sequences pupils can find the difference between the first two terms and just assume the sequence is arithmetic. 
  response: Explore a large number of geometric and arithmetic sequences and see if pupils can articulate how they check if a sequence is geometric. They might say the terms of the sequence grow more quickly (for some geometric sequences).
</misconception>
<misconception>
  Unit: Non-linear relationships
  Year: Year 9
  Content:
  misconception: Pupils may thing that given the graph is continuous, the sequence can contain all of the values represented by the line. 
  response: It is important that pupils know when it is appropriate to draw a line to graph sequences and whether values on the line have any meaning. Sequences are often given as a list of terms and without context we cannot assume the sequence is continuous.
</misconception>
<misconception>
  Unit: Non-linear relationships
  Year: Year 9
  Content:
  misconception: Square numbers are any number that can be squared. 
  response: Give students counters or let them draw dot patterns to explore square numbers geometrically as well as numerically.
</misconception>
<misconception>
  Unit: Non-linear relationships
  Year: Year 9
  Content:
  misconception: After becoming very familiar with arithmetic sequences pupils can find the difference between the first two terms and just assume the sequence is arithmetic. 
  response: Explore a large number of geometric and arithmetic sequences and see if pupils can articulate how they check if a sequence is geometric. They might say the terms of the sequence grow more quickly (for some geometric sequences).
</misconception>
<misconception>
  Unit: Non-linear relationships
  Year: Year 9
  Content:
  misconception: Pupils may think that given a graph is continuous, the sequence can contain all of the values represented by the line.
  response: It is important that pupils know when it is appropriate to draw a line to graph sequences and whether values on the line have any meaning. Sequences are often given as a list of terms and without context we cannot assume the sequence is continuous.
</misconception>
<misconception>
  Unit: Non-linear relationships
  Year: Year 9
  Content:
  misconception: Sequences are either arithmetic or geometric.
  response: There are many ways sequences can be generated and you can usually find more than one rule than can fit the first few terms of a sequence. Exploring these will ensure pupils don't have a narrow experience of sequences. 
</misconception>
<misconception>
  Unit: Non-linear relationships
  Year: Year 9
  Content:
  misconception: If you combine two sequences of the same type the resulting sequence will still be that type. 
  response: Adding corresponding terms of two sequences will be good preparation for future units but it also a way to explore what sequences can be generated by combining other sequences. 
</misconception>
<misconception>
  Unit: Probability: possible outcomes
  Year: Year 9
  Content:
  misconception: Rolling a 6 on a dice is less likely to happen than rolling other numbers. Or ticket 001 is less likely to be drawn in a raffle than other tickets.
  response: The random nature of picking a raffle or rolling a dice means all outcomes are equally likely as each other.
</misconception>
<misconception>
  Unit: Probability: possible outcomes
  Year: Year 9
  Content:
  misconception: The outcomes of a trial are always equally likely to occur (e.g. each of the two players in a tennis match are equally likely to win).
  response: There are factors that may affect how likely one outcome is compared to another (e.g. the skill or experience of one tennis player compared to the other).
</misconception>
<misconception>
  Unit: Probability: possible outcomes
  Year: Year 9
  Content:
  misconception: 'Equal chance' means the same as 'even chance'.
  response: When a trial has more than two possible outcomes which are all equally likely to happen, each outcome has less than an even chance of happening. E.g. each number on a dice has the same likelihood of being rolled, but each is less than an even chance.
</misconception>
<misconception>
  Unit: Probability: possible outcomes
  Year: Year 9
  Content:
  misconception: A small number of trials in an experiment is enough to provide conclusive findings.
  response: Even in situations where we know that the different outcomes of a trial are equally likely happen, one outcome may happen more often than the others. E.g. when we flip a coin 10 times, we don't always get the exact same number of heads and tails.
</misconception>
<misconception>
  Unit: Probability: possible outcomes
  Year: Year 9
  Content:
  misconception: Pupils want to avoid writing lists of outcomes.
  response: Always model and bring explicit attention to a systematic list. The benefits of working systematically is the likelihood of error is reduced.
</misconception>
<misconception>
  Unit: Probability: possible outcomes
  Year: Year 9
  Content:
  misconception: Pupils may worry about which event/stage of the trial should be the rows and which should be the columns in an outcome table. 
  response: Explain that the rows and columns can be transposed. Depending on the context AB and BA may be the same outcome, whereas in other contexts they may be two different outcomes, so a little care is needed in interpretation.
</misconception>
<misconception>
  Unit: Probability: possible outcomes
  Year: Year 9
  Content:
  misconception: Every group of branches should have the same number of branches.
  response: In a multi-staged trial, each stage may have a different number of outcomes. The number of branches in each group reflects the number of outcomes of a stage. This means each group of branches can be made from a different number of branches.
</misconception>
<misconception>
  Unit: Probability: possible outcomes
  Year: Year 9
  Content:
  misconception: Pupils may not draw the rectangle in their Venn diagrams.
  response: Refer back to the rectangle hosting all possible outcomes; the sample space and therefore a vital part of a Venn diagram.
</misconception>
<misconception>
  Unit: Probability: possible outcomes
  Year: Year 9
  Content:
  misconception: An outcome tree doesn't have a sample space.
  response: Each representation of the outcomes of a trial have a sample space as a part of it. For an outcome table, the table itself is the sample space. For an outcome tree, a sample space must always be constructed after drawing the two layers of branches.
</misconception>
<misconception>
  Unit: Probability: possible outcomes
  Year: Year 9
  Content:
  misconception: Pupils want to avoid writing lists of outcomes.
  response: Always model and bring explicit attention to a systematic list. The benefits of working systematically is the likelihood of error is reduced.
</misconception>
<misconception>
  Unit: Probability: possible outcomes
  Year: Year 9
  Content:
  misconception: An outcome tree can only have a maximum of three layers of branches.
  response: An outcome tree can have as many layers of branches as needed, depending on the number of stages there are in a trial. For example, if a trial involved flipping 7 coins, then there would be 7 layers of branches! That's too probably too many to draw!
</misconception>
<misconception>
  Unit: Probability: possible outcomes
  Year: Year 9
  Content:
  misconception: Pupils may struggle with the phrasing and language, when trying to identify the correct regions of the Venn diagram.
  response: Encourage the pupils to describe each region of the Venn diagram, in context where appropriate.
</misconception>
<misconception>
  Unit: Probability: possible outcomes
  Year: Year 9
  Content:
  misconception: I can use outcome tables to categorise outcomes into as many events as I want.
  response: Outcome tables are limited to categorising outcomes into only two events. You can use more tables to categorise outcomes into three or more events, but the number of tables you need quickly becomes massive!
</misconception>
<misconception>
  Unit: Probability: possible outcomes
  Year: Year 9
  Content:
  misconception: Outcome tables and outcome trees only work for outcomes that are all equally likely.
  response: Outcome tables can be separated into more rows and columns, and outcome trees split into more branches, to show outcomes that are more or less likely than other ones. This does mean these diagrams do get massive very quickly!
</misconception>
<misconception>
  Unit: Probability: theoretical probabilities
  Year: Year 9
  Content:
  misconception: Pupils may list the possible outcomes in an unsystematic way, potentially causing them to miss or repeat outcomes.
  response: Demonstrate how our system of counting is a systematic method for listing numbers and compare it to some of the listing strategies used in the lesson.
</misconception>
<misconception>
  Unit: Probability: theoretical probabilities
  Year: Year 9
  Content:
  misconception: Pupils think that 'likely' from the scale of likelihoods is only equal to a specific probability (e.g. 75%).
  response: All probabilities that are greater than 50% but less than 100% are equivalent to 'likely' on the scale of likelihoods.
</misconception>
<misconception>
  Unit: Probability: theoretical probabilities
  Year: Year 9
  Content:
  misconception: Pupils may assume that theoretical probabilities can be also found in cases where individual outcomes are not equally likely (e.g. picking a sweet out of a box where the sweets are different shapes).
  response: If the sweets in a box are different shapes then picking a sweet out of the box is not necessarily random. Someone could find their favourite flavour sweet by feeling the different shapes.
</misconception>
<misconception>
  Unit: Probability: theoretical probabilities
  Year: Year 9
  Content:
  misconception: When finding the probability of an outcome based on a frequency table, pupils may use the number of different categories as the denominator rather than the total frequency.
  response: When strawberry flavoured sweets have a frequency of 11, it means that 11 of the sweets in the box are strawberry flavoured. The box of sweets could be visually represented with each sweet being shown by the first letter of its flavour.
</misconception>
<misconception>
  Unit: Probability: theoretical probabilities
  Year: Year 9
  Content:
  misconception: A probability tree can only have two branches.
  response: A probability tree can have any number of branches on a layer, but the more branches you want to include, the trickier and less practical the probability tree is to draw and use. 
</misconception>
<misconception>
  Unit: Probability: theoretical probabilities
  Year: Year 9
  Content:
  misconception: Pupils may count the number of outcomes and state this as the probability.
  response: Remind pupils that the probability scale is between 0 and 1, so an answer of 3 is not correct.
</misconception>
<misconception>
  Unit: Probability: theoretical probabilities
  Year: Year 9
  Content:
  misconception: Venn diagrams are useful when generating a complete list of outcomes and showing the probabilities of that list.
  response: Venn diagrams can be very useful when categorising already known outcomes into events. The Venn diagram can then be used to calculate probabilities. However, Venn diagrams are not as useful when generating a list of outcomes.
</misconception>
<misconception>
  Unit: Probability: theoretical probabilities
  Year: Year 9
  Content:
  misconception: Pupils may over generalise and think that the sum of all possible events sum to 1. E.g. when rolling a standard six-sided dice, P(multiple of 6) + P(factor of 6) = 1.
  response: Emphasise that probabilities sum to 1 when the events are mutually exclusive and exhaustive. E.g. in the calculation P(multiple of 6) + P(factor of 6), the outcome '6' is counted twice.
</misconception>
<misconception>
  Unit: Probability: theoretical probabilities
  Year: Year 9
  Content:
  misconception: Pupils may struggle with finding the probability of A or B, and may count the outcomes that belong to A and B twice. 
  response: If you use an example, such as visiting particular countries, ask the pupils how someone would respond to the question 'have you visited X or Y' if they have in fact visited both countries.
</misconception>
<misconception>
  Unit: Probability: theoretical probabilities
  Year: Year 9
  Content:
  misconception: Pupils may struggle with finding the probability of A or B, and may count the outcomes that belong to A and B twice.
  response: If you use an example, such as visiting particular countries, ask the pupils how someone would respond to the question 'have you visited X or Y' if they have in fact visited both countries.
</misconception>
<misconception>
  Unit: Probability: theoretical probabilities
  Year: Year 9
  Content:
  misconception: When I see a probability tree, I always multiply the probabilities. 
  response: If a probability tree shows a two-stage trial, then the probability of an outcome is the product of the probabilities of the outcomes at each stage. The probability of an event is the sum of the probabilities of each outcome in the event.
</misconception>
<misconception>
  Unit: Probability: theoretical probabilities
  Year: Year 9
  Content:
  misconception: The probability of an event is the product of the probability of each outcome in the event.
  response: The probability of an event is the sum of the probability of each outcome in the event seen in the sample space of a diagram. For example, in the sample space at the end of a probability tree, or by adding the outcomes in the sample space of a table.
</misconception>
<misconception>
  Unit: Probability: theoretical probabilities
  Year: Year 9
  Content:
  misconception: When increasing a probability by 50%, pupils may choose to add 50% onto the existing probability rather than multiplying by 1.5.
  response: Make links to any previous work pupils may have done on increasing by a percentage and emphasise that a percentage increase is being applied to the probability.
</misconception>
<misconception>
  Unit: Standard form
  Year: Year 9
  Content:
  misconception: There are many ways to multiply decimals or large numbers. With decimals, some pupils choose to multiply decimals using the column method and incorrectly use a decimal point when calculating answers.
  response: When multiplying decimals, converting the calculation using integers and powers of 10 makes the calculation easier to work with. 
</misconception>
<misconception>
  Unit: Standard form
  Year: Year 9
  Content:
  misconception: Use of addition instead of multiplication when finding factors.
  response: Reiterate that the product of prime factors is unique.
</misconception>
<misconception>
  Unit: Standard form
  Year: Year 9
  Content:
  misconception: A negative exponent implies that the entire value is negative.
  response: Refer back to the table showing the structure of how the negative exponents occur and highlight that none of the decimal values are negative.
</misconception>
<misconception>
  Unit: Standard form
  Year: Year 9
  Content:
  misconception: Pupils can incorrectly write a number in standard form or use a number in incorrect standard form whereby the number A does not satisfy 1 ≤ A < 10 or pupils use division of positive powers of 10.
  response: Standard form represents a multiplicative relationship, so there should always be a multiplication. Embedding the understanding that negative exponents refer to 1/10^n is important. Using the place value chart with fractional and exponent form helps.
</misconception>
<misconception>
  Unit: Standard form
  Year: Year 9
  Content:
  misconception: Pupils can incorrectly write a number in standard form or use a number in incorrect standard form whereby the number A does not satisfy 1 ≤ A < 10 or pupils use division of positive powers of 10.
  response: Standard form represents a multiplicative relationship, so there should always be a multiplication. Embedding the understanding that negative exponents refer to 1/10^n is important. Using the place value chart with fractional and exponent form helps.
</misconception>
<misconception>
  Unit: Standard form
  Year: Year 9
  Content:
  misconception: Pupils can incorrectly write a number in standard form or use a number in incorrect standard form whereby the number A does not satisfy 1 ≤ A < 10 or pupils use division of positive powers of 10.
  response: Standard form represents a multiplicative relationship, so there should always be a multiplication. Embedding the understanding that negative exponents refer to 1/10^n is important. Using the place value chart with fractional and exponent form helps.
</misconception>
<misconception>
  Unit: Standard form
  Year: Year 9
  Content:
  misconception: Pupils can incorrectly write a number in standard form or use a number in incorrect standard form whereby the number A does not satisfy 1 ≤ A < 10 or pupils use division of positive powers of 10.
  response: Standard form represents a multiplicative relationship, so there should always be a multiplication. Embedding the understanding that negative exponents refer to 1/10^n is important. Using the place value chart with fractional and exponent form helps.
</misconception>
<misconception>
  Unit: Trigonometry
  Year: Year 9
  Content:
  misconception: You need to know all the lengths or all of the angles in a pair of triangles to know that they are similar.
  response: Remind pupils that they do not necessarily need to know all of the length and angles to determine whether two triangles are congruent, so they don't all need to be known to determine similarity.
</misconception>
<misconception>
  Unit: Trigonometry
  Year: Year 9
  Content:
  misconception: Pupils may find it initially difficult to see how Pythagoras' theorem can be used when a right-angled triangle is not immediately available.
  response: Encourage pupils to draw their own diagram in cases where there is not one provided. In cases where pairs of coordinates are being used, encourage pupils to draw on horizontal and vertical line segments.
</misconception>
<misconception>
  Unit: Trigonometry
  Year: Year 9
  Content:
  misconception: When reading the values of the trigonometric functions during the explanation slides and the tasks, pupils may think that all the values taken from the graphs are fully accurate. 
  response: Explain that many of the values from the trigonometric functions have digits beyond the second decimal place. However, two decimal places is a reasonable degree of accuracy for reading values from the graphs during this lesson.
</misconception>
<misconception>
  Unit: Trigonometry
  Year: Year 9
  Content:
  misconception: When reading the values of the trigonometric functions during the explanation slides and the tasks, pupils may think that all the values taken from the graphs are fully accurate. 
  response: Explain that many of the values from the trigonometric functions have digits beyond the second decimal place. However, two decimal places is a reasonable degree of accuracy for reading values from the graphs during this lesson.
</misconception>
<misconception>
  Unit: Trigonometry
  Year: Year 9
  Content:
  misconception: sin(60°) is double sin(30°).
  response: The values of the sine or cosine of an angle do not scale linearly. We can see from the unit circle that an angle of 30° meets the circle at a height of 0.5 units, whilst an angle of 60° meets the circle at a height of approximately 0.87 units.
</misconception>
<misconception>
  Unit: Trigonometry
  Year: Year 9
  Content:
  misconception: tan(60°) is double tan(30°).
  response: The values of tan of an angle do not scale linearly. From the unit circle, we see that an angle of 30° meets a tangent to the circle at a height of approx. 0.58 units, whilst an angle of 60° meets the same tangent at a height of approx. 1.73 units.
</misconception>
<misconception>
  Unit: Trigonometry
  Year: Year 9
  Content:
  misconception: The sine formula is only used to find the length of a side opposite an angle.
  response: Whilst the sine formula can be used to find the length of a side opposite an angle, a rearrangement of the formula also allows us to find the length of the hypotenuse given the opposite side. The arcsine function allows us to find the angle, itself.
</misconception>
<misconception>
  Unit: Trigonometry
  Year: Year 9
  Content:
  misconception: The cosine formula is only used to find the length of a side adjacent to an angle.
  response: The cosine formula can be used to find the length of a side adjacent to an angle. A rearrangement of the formula also allows us to find the length of the hypotenuse given the adjacent side. The arccosine function allows us to find the angle, itself.
</misconception>
<misconception>
  Unit: Trigonometry
  Year: Year 9
  Content:
  misconception: Pupils may get the fraction (opposite/adjacent) inverted and this will still return an answer so they may believe they are correct.
  response: Remind pupils to sense check their answers. The larger the angle, the longer the opposite side will be. 
</misconception>
<misconception>
  Unit: Trigonometry
  Year: Year 9
  Content:
  misconception: Pupils may believe the horizontal edge of the triangle is always the adjacent. 
  response: Emphasise that the labelling of the triangle is based around the focus angle and use right-angled triangles with various orientations.
</misconception>
<misconception>
  Unit: Trigonometry
  Year: Year 9
  Content:
  misconception: Pupils may struggle to find a right-angled triangle within the context of the question.
  response: Encourage the pupils to sketch the question and consider adding a perpendicular line to the diagram. 
</misconception>
<misconception>
  Unit: Trigonometry
  Year: Year 9
  Content:
  misconception: Pupils may struggle to identify a right-angled triangle in the problem.
  response: Encourage pupils to sketch the question out and add any known right angles or perpendicular lines, as this may lead to a right-angled triangle. 
</misconception>
</misconceptions>`;

**Misconception Target:** [Which misconception this question addresses]

### Question:
[The actual question text]

### Visual Description:
[Detailed description of any diagrams, charts, or visual elements needed. Be very specific about:
- Shapes, sizes, orientations
- Labels and measurements
- Grid lines or coordinate systems
- Colors or shading if relevant
- Arrows or other annotations
This description should be detailed enough for someone to recreate the visual accurately]
---

</markdown>

{{MISCONCEPTION_STORE}}

Important Guidelines:
- Focus on questions that reveal understanding vs memorization
- Include a mix of calculation, reasoning, and problem-solving questions
- Ensure visual descriptions are extremely detailed and specific
- Each question should target a different aspect of the topic or different misconceptions
- Make questions accessible but challenging for KS3 students
- Include real-world contexts where appropriate`;

export const EXAMPLE_PROMPTS = [
  "I've taught my class about fractions and they're struggling with adding fractions with different denominators",
  "My students have learned about area and perimeter but keep confusing them",
  "I've covered basic algebra and my class is having trouble with expanding brackets",
  "We've studied coordinate geometry but students keep mixing up x and y coordinates",
  "I've taught Pythagoras' theorem but students don't know which side is the hypotenuse"
];