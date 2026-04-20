export function evaluate(answer, keywords) {
    const text = answer.toLowerCase();

    if (text.length < 30) return 0;

    let score = 0;

    keywords.forEach((word) => {
        if (text.includes(word.toLowerCase())) {
            score++;
        }
    });

    if (text.split(" ").length > 6) {
        score++;
    }

    return score;
}


export function evaluateAll(answers, questions) {
    const scores = answers.map((ans, i) =>
        evaluate(ans, questions[i].keywords)
    );

    const totalScore = scores.reduce((a, b) => a + b, 0);

    return { scores, totalScore };
}
