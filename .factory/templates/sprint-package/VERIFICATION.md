# <Package name>: verification

## Before you start

Node 22, `npm ci`, and a green `npm run check` on the starting commit.

## Commands

| Check | Command | Expected | Does not prove | If it fails |
|---|---|---|---|---|
| Gate | `npm run check` | exits 0 | Behavior in a browser | Repair |
| Browser | `npm run test:e2e` | all pass | A real phone | Repair |
| <task-specific> | | | | Repair or pause |

## Manual checks

| Check | Device | Owner | Evidence |
|---|---|---|---|
| | | | |
