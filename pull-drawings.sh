git add -A; git ls-files --deleted -z | xargs -r0 git rm; git commit -n -m "--wip--"
rclone dedupe --dedupe-mode newest drive:talk-wfs
rclone sync drive:talk-wfs src/img/drawings
npx svgo -f src/img/drawings -o src/img/drawings-optimized
