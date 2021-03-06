# Change log

## [0.5.0] - 2015-07-25
### Changed
- ActionCreators to [FSA](https://github.com/acdlite/flux-standard-action).
- Examples to redux 1.0.0-rc.
- Renamed `typeName` to `type`.

## [0.4.0] - 2015-06-21
### Changed
- Moved lookup into its own package [rlookup](https://github.com/UXtemple/rlookup).
- Moved to redux.

## [0.3.1] - 2015-06-15
### Changed
- Leverage flummox's implicit state update on return from reducers.

## [0.3.0] - 2015-06-12
### Changed
- Removed memoisation of panels, it will have to be thought out a bit more before it lands again.
- Removed blocks.
- Removed actions class. Export raw functions.
- Extracted stores functionality into raw functions too getting them ready to be stripped off their
  state soon.
- Replaced `immutable-js` for `seamless-immutable` as it is lighter and its output are cleaner and
  backwards compatible with vanilla JS types.
- Replaced the immutable record for a simple function that returns the values it specifically picked
  up from the object passed as an argument.

## [0.2.0] - 2015-06-07
### Added
- `getByUri` now uses `Lookup` to match dynamic routes in the store. Routes are matched by
  [Houkou](https://github.com/deoxxa/houkou) and a _complexity_ comparison is done to ensure that
  more specific routes are matched. There's lot of room for improvement here.
- `PanelRecord#from` and `BlockRecord#from` to load raw data structures and do any necessary
  mappings to immutables.

## [0.1.1] - 2015-05-24
### Added
- `title` field to `PanelRecord`.

## [0.1.0] - 2015-05-23
### Added
- Flummox Actions and Store.
- Immutable PanelRecord.
- Playground with dummy data and a flux app.
