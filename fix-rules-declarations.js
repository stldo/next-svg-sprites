/* Fix Next.js rule declarations that were set to non array objects, they break
* svg-sprite-loader on production build. */
module.exports = function fixRulesDeclarations (rules) {
  for (const rule of rules) {
    if (rule.oneOf) {
      for (const oneOfRule of rule.oneOf) {
        if (oneOfRule.use && !Array.isArray(oneOfRule.use)) {
          oneOfRule.use = [oneOfRule.use]
        }
      }
    }
  }
}
