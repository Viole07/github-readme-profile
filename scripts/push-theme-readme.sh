#!/bin/bash
set -x
set -e

if [[ "$(git status --porcelain)" != "" ]]; then
  git --version
  git config --global user.email "86386385+FajarKim@users.noreply.github.com"
  git config --global user.name "Rangga Fajar Oktariansyah"
  git config --global --add safe.directory ${GITHUB_WORKSPACE}
  git add --all
  git commit --message "docs(theme): auto update theme readme"
  git remote add master https://${PERSONAL_TOKEN}@github.com/${GH_REPO}.git
  git push -f
fi
