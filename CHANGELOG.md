# Changelog

All notable changes to this project will be documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/) and this project adheres to [Semantic Versioning](https://semver.org/).

## [0.2.0] - 2021-01-03

A complete rewrite that uses the [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) for higher efficiency. A lot of the features have been removed to ensure stability and will be added bit by bit.
Also, the toolset has been updated to remove deprecated tools (such as `tslint` and `node-sass`).

### Fixed

- Performance of the component when the number of rows/columns increased.

### Changed

- `input` event is now fired per pixel change.
- Only colors in the `#RRGGBB` format are accepted now. If more freedom is required, check out the [tinycolor2](http://npmjs.com/package/tinycolor2) package.
- Moved `Vue` from dependencies to _peer_ and _dev_ dependencies.

### Removed

- `value`, `checkers`, `grid`, and `highlightOnHover` props (temporarily - until they are functional again).
- `v-model`, as there is no longer one object with all data.
- `update:pixel` event.
- Slot option (it no longer makes sense with the `<canvas>`).


## [0.1.0] - 2019-06-02

First release with initial feature set. It was too slow when the number of rows/columns grew.


[unreleased]: https://github.com/aabounegm/vue-pixel-board/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/aabounegm/vue-pixel-board/releases/tag/v0.2.0
[0.1.0]: https://github.com/aabounegm/vue-pixel-board/releases/tag/0.1
