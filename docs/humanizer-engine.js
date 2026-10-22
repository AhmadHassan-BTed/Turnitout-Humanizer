/**
 * Turnitout Client-Side Humanizer Engine
 * 100% In-Browser, Zero-Network, Privacy-Guaranteed Text & Document Humanization.
 * 
 * Pipeline:
 * 1. Invisible Unicode / Provenance Watermark Scrubbing
 * 2. Syntax & Macro Shielding (LaTeX math, citations, markdown code blocks)
 * 3. Linguistic AI Cliché Disruption & Vocabulary Normalization
 * 4. Punctuation & Em-Dash Flow Harmonization
 * 5. Unshielding & Metrics Generation
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.TurnitoutEngine = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // =========================================================================
  // 1. Invisible Unicode & Tracking Watermarks (Layer A)
  // =========================================================================
  const INVISIBLE_UNICODE_REGEX = /[\u200B\u200C\u200D\uFEFF\u00AD\u2060\u200E\u200F\u200A\u2009\u2028\u2029]/g;

  // Cyrillic / Greek lookalike homoglyphs occasionally injected by LLMs or watermarking tools
  const HOMOGLYPH_MAP = {
    '\u0430': 'a', '\u0410': 'A', // Cyrillic a
    '\u0435': 'e', '\u0415': 'E', // Cyrillic e
    '\u043E': 'o', '\u041E': 'O', // Cyrillic o
    '\u0440': 'p', '\u0420': 'P', // Cyrillic p
    '\u0441': 'c', '\u0421': 'C', // Cyrillic c
    '\u0443': 'y', '\u0423': 'Y', // Cyrillic y
    '\u0445': 'x', '\u0415': 'X', // Cyrillic x
    '\u0456': 'i', '\u0406': 'I', // Ukrainian i
    '\u03BF': 'o', '\u039F': 'O', // Greek omicron
  };
  const HOMOGLYPH_REGEX = /[\u0430\u0410\u0435\u0415\u043E\u041E\u0440\u0420\u0441\u0421\u0443\u0423\u0445\u0415\u0456\u0406\u03BF\u039F]/g;

  // =========================================================================
  // 2. Syntax & Macro Shielding (LaTeX, Markdown Code, URLs)
  // =========================================================================
  const SHIELD_PATTERNS = [
    // Fenced Code Blocks (``` ... ```)
    /```[\s\S]*?```/g,
    // Inline Code (` ... `)
    /`[^`\n]+`/g,
    // URLs
    /https?:\/\/[^\s<>"{}|\^~`\[\]]+/g,
    // LaTeX Display Math ($$ ... $$ and \[ ... \])
    /\$\$[\s\S]*?\$\$/g,
    /\\\[[\s\S]*?\\\]/g,
    // LaTeX Inline Math ($ ... $ and \( ... \))
    /\$[^\$\n]+\$/g,
    /\\\([^\)\n]+\\\)/g,
    // LaTeX Citations and References (\cite{...}, \citep{...}, \citet{...}, \ref{...}, \label{...})
    /\\(?:cite[a-z]*|ref|label|pageref|eqref)\{[^}]+\}/g,
    // LaTeX Environments (\begin{...} ... \end{...})
    /\\begin\{([a-zA-Z*]+)\}[\s\S]*?\\end\{\1\}/g,
    // LaTeX Custom Commands with arguments (e.g., \textbf{...}, \section{...})
    /\\[a-zA-Z]+(?:\[[^\]]*\])?\{[^}]*\}/g
  ];

  // =========================================================================
  // 3. Comprehensive Academic & Stylistic AI Disruption Lexicon
  // =========================================================================
  const DISRUPTION_RULES = [
    // Significance & Cliché Inflation (Wikipedia "Signs of AI Writing")
    { pattern: /\bstands as a testament to\b/gi, replacement: "reflects" },
    { pattern: /\bstands as a testament\b/gi, replacement: "reflects" },
    { pattern: /\bis a testament to\b/gi, replacement: "demonstrates" },
    { pattern: /\bserves as a testament to\b/gi, replacement: "demonstrates" },
    { pattern: /\bplays a pivotal role in\b/gi, replacement: "is essential to" },
    { pattern: /\bplays a pivotal role\b/gi, replacement: "is essential" },
    { pattern: /\bplays a crucial role in\b/gi, replacement: "is key to" },
    { pattern: /\bplays a crucial role\b/gi, replacement: "is vital" },
    { pattern: /\bplays a vital role in\b/gi, replacement: "is central to" },
    { pattern: /\bplays a key role in\b/gi, replacement: "is important for" },
    { pattern: /\bserves as a beacon of\b/gi, replacement: "signals" },
    { pattern: /\bserves as a reminder that\b/gi, replacement: "reminds us that" },
    { pattern: /\bserves as a critical milestone\b/gi, replacement: "is a major milestone" },
    { pattern: /\bit is important to delve into\b/gi, replacement: "we examine" },
    { pattern: /\bdelve deep into the multifaceted dimensions of\b/gi, replacement: "examine the details of" },
    { pattern: /\bdelve deep into\b/gi, replacement: "closely analyze" },
    { pattern: /\bdelve into\b/gi, replacement: "examine" },
    { pattern: /\bdelving into\b/gi, replacement: "examining" },
    { pattern: /\bcomprehensive tapestry\b/gi, replacement: "broad range" },
    { pattern: /\brich tapestry\b/gi, replacement: "wide variety" },
    { pattern: /\bvibrant tapestry\b/gi, replacement: "diverse mix" },
    { pattern: /\btapestry of\b/gi, replacement: "spectrum of" },
    
    // Temporal & Buzzword Framing
    { pattern: /\bin today's fast-paced digital era,?\b/gi, replacement: "Today," },
    { pattern: /\bin today's digital era,?\b/gi, replacement: "Currently," },
    { pattern: /\bin today's fast-paced world,?\b/gi, replacement: "Currently," },
    { pattern: /\bin the rapidly evolving landscape of\b/gi, replacement: "in modern" },
    { pattern: /\bevolving landscape\b/gi, replacement: "developing environment" },
    { pattern: /\bdynamic landscape\b/gi, replacement: "field" },
    { pattern: /\bdigital landscape\b/gi, replacement: "digital space" },
    { pattern: /\btechnological landscape\b/gi, replacement: "technology sector" },

    // Superficial -ing & Filler Analysis
    { pattern: /\bunderscores the importance of\b/gi, replacement: "emphasizes" },
    { pattern: /\bunderscoring the importance of\b/gi, replacement: "emphasizing" },
    { pattern: /\bunderscores\b/gi, replacement: "highlights" },
    { pattern: /\bunderscoring\b/gi, replacement: "highlighting" },
    { pattern: /\bsheds light on\b/gi, replacement: "clarifies" },
    { pattern: /\bshedding light on\b/gi, replacement: "clarifying" },
    { pattern: /\bhighlights the interplay between\b/gi, replacement: "examines how" },
    { pattern: /\bthe interplay between\b/gi, replacement: "the interaction of" },
    { pattern: /\bprovides a robust framework\b/gi, replacement: "gives a solid basis" },
    { pattern: /\brobust framework\b/gi, replacement: "effective framework" },
    { pattern: /\bcannot be overlooked\b/gi, replacement: "warrants attention" },
    { pattern: /\bcannot be understated\b/gi, replacement: "is significant" },
    { pattern: /\bpaves the way for\b/gi, replacement: "enables" },
    { pattern: /\bpaving the way for\b/gi, replacement: "enabling" },
    { pattern: /\bsetting the stage for\b/gi, replacement: "preparing for" },
    { pattern: /\bmarks a significant shift\b/gi, replacement: "shifts" },
    { pattern: /\ba paradigm shift\b/gi, replacement: "a major change" },
    { pattern: /\bmultifaceted dimensions of\b/gi, replacement: "various aspects of" },
    { pattern: /\bmultifaceted nature of\b/gi, replacement: "complexity of" },
    { pattern: /\bmultifaceted\b/gi, replacement: "complex" },
    { pattern: /\bfosters a culture of\b/gi, replacement: "encourages" },
    { pattern: /\bfosters\b/gi, replacement: "promotes" },
    { pattern: /\bfostering\b/gi, replacement: "promoting" },
    { pattern: /\bof paramount importance\b/gi, replacement: "critical" },
    { pattern: /\bparamount\b/gi, replacement: "essential" },
    { pattern: /\bin the realm of\b/gi, replacement: "in" },
    { pattern: /\bindelible mark\b/gi, replacement: "lasting impact" },
    { pattern: /\ba beacon of hope\b/gi, replacement: "a positive model" },
    { pattern: /\bharness the power of\b/gi, replacement: "use" },
    { pattern: /\bharnessing the power of\b/gi, replacement: "using" },
    { pattern: /\bleverage the potential of\b/gi, replacement: "apply" },
    { pattern: /\bseamlessly integrates\b/gi, replacement: "integrates" },
    { pattern: /\bseamless integration\b/gi, replacement: "integration" },
    { pattern: /\bseamlessly\b/gi, replacement: "smoothly" },
    
    // AI Vocabulary Preferences
    { pattern: /\butilize\b/gi, replacement: "use" },
    { pattern: /\butilizes\b/gi, replacement: "uses" },
    { pattern: /\butilized\b/gi, replacement: "used" },
    { pattern: /\butilizing\b/gi, replacement: "using" },
    { pattern: /\butilization\b/gi, replacement: "use" },
    { pattern: /\bleverage\b/gi, replacement: "use" },
    { pattern: /\bleverages\b/gi, replacement: "uses" },
    { pattern: /\bleveraged\b/gi, replacement: "used" },
    { pattern: /\bleveraging\b/gi, replacement: "using" },
    { pattern: /\bshowcase\b/gi, replacement: "show" },
    { pattern: /\bshowcases\b/gi, replacement: "shows" },
    { pattern: /\bshowcased\b/gi, replacement: "showed" },
    { pattern: /\bshowcasing\b/gi, replacement: "showing" },
    { pattern: /\bcommendable\b/gi, replacement: "notable" },
    { pattern: /\bmeticulous\b/gi, replacement: "thorough" },
    { pattern: /\bmeticulously\b/gi, replacement: "thoroughly" },
    { pattern: /\bpivotal\b/gi, replacement: "key" },
    { pattern: /\bconducive to\b/gi, replacement: "helpful for" },
    { pattern: /\bimperative that\b/gi, replacement: "necessary that" },
    { pattern: /\bit is imperative\b/gi, replacement: "it is necessary" },

    // Mechanical Transitions & Connectors
    { pattern: /\bIn conclusion,?\b/gi, replacement: "To conclude," },
    { pattern: /\bTo wrap up,?\b/gi, replacement: "In summary," },
    { pattern: /\bFurthermore, the interplay between\b/gi, replacement: "Also, balancing" },
    { pattern: /\bFurthermore,?\b/gi, replacement: "Additionally," },
    { pattern: /\bMoreover,?\b/gi, replacement: "In addition," },
    { pattern: /\bNotably,?\b/gi, replacement: "Specifically," },
    { pattern: /\bUltimately, this paradigm shift\b/gi, replacement: "In the end, this shift" },
    { pattern: /\bUltimately,?\b/gi, replacement: "In the end," },
    { pattern: /\bIt is worth noting that\b/gi, replacement: "Notably," },
    { pattern: /\bIt is worth mentioning that\b/gi, replacement: "Specifically," },
    { pattern: /\bWithout further ado,?\b/gi, replacement: "First," },
    { pattern: /\bA wide array of\b/gi, replacement: "Numerous" },
    { pattern: /\ba wide array of\b/gi, replacement: "numerous" },
    { pattern: /\ba plethora of\b/gi, replacement: "many" },
    { pattern: /\blies at the heart of\b/gi, replacement: "is central to" },
    { pattern: /\ba deep dive into\b/gi, replacement: "an analysis of" }
  ];

  // Helper: Preserve Capitalization of replaced words
  function matchCasing(original, replacement) {
    if (!original || !replacement) return replacement;
    if (original === original.toUpperCase() && original.length > 1) {
      return replacement.toUpperCase();
    }
    const firstChar = original.charAt(0);
    if (firstChar === firstChar.toUpperCase() && firstChar !== firstChar.toLowerCase()) {
      return replacement.charAt(0).toUpperCase() + replacement.slice(1);
    }
    return replacement.charAt(0).toLowerCase() + replacement.slice(1);
  }

  // =========================================================================
  // Engine Core Class
  // =========================================================================
  class TurnitoutHumanizer {
    constructor(options = {}) {
      this.options = Object.assign({
        mode: 'academic', // 'conservative' | 'academic' | 'aggressive'
        cleanInvisibles: true,
        cleanHomoglyphs: true,
        normalizeEmDashes: true,
        preserveLaTeX: true
      }, options);
    }

    /**
     * Phase 1: Clean hidden Unicode watermarks & homoglyphs
     */
    cleanProvenanceWatermarks(text) {
      let cleaned = text;
      let removedInvisiblesCount = 0;
      let normalizedHomoglyphsCount = 0;

      if (this.options.cleanInvisibles) {
        const matches = cleaned.match(INVISIBLE_UNICODE_REGEX);
        if (matches) {
          removedInvisiblesCount = matches.length;
          cleaned = cleaned.replace(INVISIBLE_UNICODE_REGEX, '');
        }
      }

      if (this.options.cleanHomoglyphs) {
        const homoglyphMatches = cleaned.match(HOMOGLYPH_REGEX);
        if (homoglyphMatches) {
          normalizedHomoglyphsCount = homoglyphMatches.length;
          cleaned = cleaned.replace(HOMOGLYPH_REGEX, (char) => HOMOGLYPH_MAP[char] || char);
        }
      }

      return {
        text: cleaned,
        invisiblesCleaned: removedInvisiblesCount,
        homoglyphsNormalized: normalizedHomoglyphsCount
      };
    }

    /**
     * Phase 2: Shield syntax (LaTeX math, citations, code blocks, URLs)
     */
    shieldSyntax(text) {
      if (!this.options.preserveLaTeX) {
        return { text, tokens: [] };
      }

      const tokens = [];
      let shielded = text;

      SHIELD_PATTERNS.forEach(pattern => {
        shielded = shielded.replace(pattern, (match) => {
          const token = `__TURNITOUT_SHIELD_${tokens.length}__`;
          tokens.push({ token, original: match });
          return token;
        });
      });

      return { text: shielded, tokens };
    }

    /**
     * Phase 3: Unshield syntax
     */
    unshieldSyntax(text, tokens) {
      let unshielded = text;
      // Replace tokens in reverse order to avoid nested collision
      for (let i = tokens.length - 1; i >= 0; i--) {
        const item = tokens[i];
        unshielded = unshielded.replace(item.token, item.original);
      }
      return unshielded;
    }

    /**
     * Phase 4: Linguistic AI Cliché Disruption
     */
    disruptPatterns(text) {
      let processed = text;
      const changes = [];

      // Negative parallelism pass: "not only X, but also Y" -> "both X and Y"
      const negParallelRegex = /\bnot only\s+([^,]+?),\s*but also\s+([^.]+?)\b/gi;
      processed = processed.replace(negParallelRegex, (match, p1, p2) => {
        const replacement = `both ${p1.trim()} and ${p2.trim()}`;
        changes.push({ from: match, to: replacement });
        return matchCasing(match, replacement);
      });

      // Apply disruption rules
      DISRUPTION_RULES.forEach(rule => {
        processed = processed.replace(rule.pattern, (match) => {
          const replacement = matchCasing(match, rule.replacement);
          changes.push({ from: match, to: replacement });
          return replacement;
        });
      });

      // Normalize Em-Dashes if requested (excessive unspaced em dashes are an AI fingerprint)
      if (this.options.normalizeEmDashes) {
        processed = processed.replace(/(\w)—(\w)/g, '$1, $2');
        processed = processed.replace(/\s*—\s*/g, ' — ');
      }

      // Cleanup whitespace
      processed = processed.replace(/[ \t]{2,}/g, ' ');

      return { text: processed, changes };
    }

    /**
     * Execute Full Humanization Pipeline
     */
    humanize(input) {
      if (!input || typeof input !== 'string') {
        return {
          originalText: '',
          cleanText: '',
          invisiblesCleaned: 0,
          patternsDisrupted: 0,
          changes: [],
          stats: { inputWords: 0, outputWords: 0 }
        };
      }

      // 1. Scrub Watermarks
      const watermarkRes = this.cleanProvenanceWatermarks(input);

      // 2. Shield Code & Math
      const shieldRes = this.shieldSyntax(watermarkRes.text);

      // 3. Disrupt AI Patterns
      const disruptRes = this.disruptPatterns(shieldRes.text);

      // 4. Restore Code & Math
      const finalText = this.unshieldSyntax(disruptRes.text, shieldRes.tokens);

      const countWords = (str) => {
        const m = str.trim().match(/\S+/g);
        return m ? m.length : 0;
      };

      return {
        originalText: input,
        cleanText: finalText,
        invisiblesCleaned: watermarkRes.invisiblesCleaned + watermarkRes.homoglyphsNormalized,
        patternsDisrupted: disruptRes.changes.length,
        changes: disruptRes.changes,
        stats: {
          inputWords: countWords(input),
          outputWords: countWords(finalText),
          shieldedTokens: shieldRes.tokens.length
        }
      };
    }
  }

  return {
    TurnitoutHumanizer,
    DISRUPTION_RULES,
    INVISIBLE_UNICODE_REGEX
  };
}));
