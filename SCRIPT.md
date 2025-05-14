  ## Script Reference:
  -----------------
  yarn rm-dist         → Remove ./dist folder

  yarn test            → Type-check everything, then run Jest tests

  yarn build           → Build everything including test files

  yarn build-prod      → Clean build for production (no tests included)

  yarn prepare-publish → Reinstall deps, test, build-prod, check the bundle or package

  yarn publish         → Prepare then publish with version bump

  yarn bundle-check         → This command simulates the packing of your package, showing which files would be bundled into the .tgz archive that npm would publish. It helps in confirming that the correct files are included or excluded (e.g., via .npmignore or package.json files field).
