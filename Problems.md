# Distrochooser 5 design

- Allow better result diversification (results return too often large amount of results)
- Allow more wide range of answers without derailing
- Implement better way of feedback directly on the result tuples ("I like that distro, not this one")
- Allow better way of implementing new distros
- Implement better way for translating (.po based?)
- Remove pre 4.0 backend clusterfuck
- Use a mathematical selection approach instead of self developed (e. g. https://github.com/lagodiuk/decision-tree-js)
- Make decision process modular to allow isolation and substitution
  - If needed: Use a server based decision tree and connect it using HTTP requests)