#!/usr/bin/env sh

set -ue -o pipefail

_setup_frontend() {
  cd frontend/
  yarn install
  npm run build
  cd ../
}

_up_app() {
  sbt "project app" run
}

_setup_frontend
_up_app
