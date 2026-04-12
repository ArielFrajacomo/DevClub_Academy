function bitwiseRandomColor() {
    /*
    (Math.random() * 2 ** 24) | 0 
        the operator "| 0", bitwise OR truncates the decimal part of a number.
        it is used as a faster alternative to Math.floor() when working with integers.
    Math.random() returns a number in the range: [0, 1) 
        — meaning: it never returns 1, but can return 0. So multiplying it by 2^24 (which is 16777216) gives us 
                   a range of [0, 16777216), which includes all possible RGB color combinations (from 0 to 16777215).
        2^24 in hexadecimal is 0x1000000 => 0x ff ff ff (+1 for pure white)
    */
    const color = (Math.random() * 0x1000000) | 0; // Generate a color in the range of 0x000000 to 0xFFFFFF
    const red = color & 0xFF;           // Get the last 8 bits for red
    const green = (color >> 8) & 0xFF;  // Get the next 8 bits for green
    const blue = (color >> 16) & 0xFF;  // Get the next 8 bits for blue

    return red + green + blue;
}

function colorThreeRandoms() {
    const red = (Math.random() * 256) | 0;
    const green = (Math.random() * 256) | 0;
    const blue = (Math.random() * 256) | 0;

    return red + green + blue;
}

function runBenchmark(iterations = 10_000_000) {
    let results = [];
    let timeStart, timeEnd;

    results.push(`Running ${iterations.toLocaleString()} iterations per test...`);
    
    // Benchmark for bitwise random color generation
    timeStart = performance.now();
    for (let i = 0; i < iterations; i++) {
        bitwiseRandomColor();
    }
    timeEnd = performance.now();
    results.push(`Bitwise random color: ${(timeEnd - timeStart)} ms`);

    // Benchmark for three randoms color generation
    timeStart = performance.now();
    for (let i = 0; i < iterations; i++) {
        colorThreeRandoms();
    }
    timeEnd = performance.now();
    results.push(`Three randoms color: ${(timeEnd - timeStart)} ms`);

    // Output results
    console.log(results.join('\n'));
    return results;
}

function runBenchmark_popup() {
    alert(runBenchmark().join('\n'));
}

runBenchmark();