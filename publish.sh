#!/bin/bash

npm publish && npm version $1 && git push
