# egress-bootstrap changelog

## v0.1.2

### Breaking changes

* Renaming the project to `egress-bootstrap`

* Renaming of variables, files, HTML id's, etc:
    * `login` to `signin`
    * `logout` to `signout`

### Minor changes
    
* Improved UI
    * Restructured jade markup
    * Usage of jade mixins for navigation items, see `nav.jade`
    * CSS tweaks

## v0.1.1

### Bug fixes

* Usernames and emails for logins are now case insensitive.
  * Login tests added to verify this bug has been fixed.

### Minor changes

* Improved readability of the docs in `readme.md`

## v0.1.0

* Initial release
