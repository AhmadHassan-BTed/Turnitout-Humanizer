const assert = require('assert');
const path = require('path');
const { TurnitoutHumanizer, DISRUPTION_RULES } = require('../docs/humanizer-engine.js');

describe = (name, fn) => {
  console.log(`\n--- Test Suite: ${name} ---`);
  fn();
};

it = (name, fn) => {
  try {
    fn();
    console.log(`  ✓ ${name}`);
  } catch (err) {
    console.error(`  ✗ ${name}`);
    console.error(err);
    process.exitCode = 1;
  }
};

describe('Turnitout Client-Side Humanizer Engine', () => {
  const engine = new TurnitoutHumanizer();

  it('1. Removes zero-width and invisible Unicode tracking watermarks', () => {
    // String with embedded Zero-Width Space (\u200B) and BOM (\uFEFF)
    const dirtyText = "This\u200B is\uFEFF watermarked\u200C text.";
    const result = engine.humanize(dirtyText);
    assert.strictEqual(result.cleanText, "This is watermarked text.");
    assert.strictEqual(result.invisiblesCleaned >= 3, true);
  });

  it('2. Normalizes Cyrillic lookalike homoglyphs', () => {
    // Cyrillic 'a' (\u0430) and 'e' (\u0435) substituted
    const homoglyphText = "P\u0430p\u0435r";
    const result = engine.humanize(homoglyphText);
    assert.strictEqual(result.cleanText, "Paper");
  });

  it('3. Protects LaTeX citations and formulas from disruption', () => {
    const latexText = "In conclusion, we examine \\cite{vaswani2017attention} and $E = mc^2$ under \\begin{equation}x=y\\end{equation}.";
    const result = engine.humanize(latexText);
    
    assert(result.cleanText.includes("\\cite{vaswani2017attention}"), "Citation must be preserved untouched");
    assert(result.cleanText.includes("$E = mc^2$"), "Inline math must be preserved untouched");
    assert(result.cleanText.includes("\\begin{equation}x=y\\end{equation}"), "LaTeX environment must be preserved");
    assert(result.cleanText.includes("To conclude"), "'In conclusion' should be converted to 'To conclude'");
  });

  it('4. Protects Markdown code blocks and inline code', () => {
    const codeText = "Furthermore, consider the code:\n```python\ndef delve_into():\n    return 'utilize'\n```\nIt is utilized widely.";
    const result = engine.humanize(codeText);

    assert(result.cleanText.includes("def delve_into():"), "Function name in code block must not be replaced");
    assert(result.cleanText.includes("return 'utilize'"), "Code string in code block must not be replaced");
    assert(result.cleanText.includes("Additionally,"), "'Furthermore,' should be replaced with 'Additionally,'");
    assert(result.cleanText.includes("used widely"), "'utilized' outside code block should be replaced with 'used'");
  });

  it('5. Disrupts high-frequency AI writing tropes and preserves capitalization', () => {
    const aiText = "This study plays a pivotal role in illustrating that machine learning stands as a testament to innovation. It is important to delve into the comprehensive tapestry of models.";
    const result = engine.humanize(aiText);

    assert(!result.cleanText.includes("stands as a testament to"), "Must remove 'stands as a testament to'");
    assert(result.cleanText.includes("reflects innovation"), "Must replace with 'reflects'");
    assert(!result.cleanText.includes("plays a pivotal role"), "Must remove 'plays a pivotal role'");
    assert(!result.cleanText.includes("comprehensive tapestry"), "Must remove 'comprehensive tapestry'");
  });

  it('6. Reforms negative parallelisms ("not only X, but also Y")', () => {
    const parallelText = "The system is not only faster, but also more reliable in production.";
    const result = engine.humanize(parallelText);

    assert(result.cleanText.includes("both faster and more reliable"), "Must reform negative parallelism into direct phrasing");
  });

  it('7. Handles edge cases cleanly (empty string, code-only, symbols)', () => {
    const emptyResult = engine.humanize("");
    assert.strictEqual(emptyResult.cleanText, "");
    assert.strictEqual(emptyResult.patternsDisrupted, 0);

    const nullResult = engine.humanize(null);
    assert.strictEqual(nullResult.cleanText, "");

    const symbolsResult = engine.humanize("@#$%^&*()!~");
    assert.strictEqual(symbolsResult.cleanText, "@#$%^&*()!~");
  });

  it('8. Verifies metrics and statistics integrity', () => {
    const sample = "In conclusion, we delve into the evolving landscape.";
    const result = engine.humanize(sample);

    assert.strictEqual(result.stats.inputWords, 8);
    assert.strictEqual(result.stats.outputWords >= 7, true);
    assert.strictEqual(result.patternsDisrupted >= 2, true);
  });
});

if (process.exitCode === 1) {
  console.error("\n❌ Some tests failed!");
  process.exit(1);
} else {
  console.log("\n✅ ALL 8 HUMANIZER ENGINE TESTS PASSED CLEANLY!");
}
