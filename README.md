# Ghaster

A small Minecraft Java data pack that makes named happy ghasts fly faster while a player is riding them.

Pack format 121 (game version 26.x).

## Speed boosts

Name a happy ghast (with a name tag) to give it a boost. Names are case-sensitive.

| Name        | Speed |
|-------------|-------|
| `Pegasus`   | 2x    |
| `Toothless` | 3x    |
| `Falkor`    | 4x    |

The boost applies only while someone is riding the ghast and ends as soon as they dismount.

## Install

1. Download `ghaster-<version>.zip` from the [latest release](https://github.com/mipaca/ghaster/releases/latest).
2. Put the zip in your world's `datapacks/` folder (or unzip it there as a folder named `ghaster`, so `pack.mcmeta` sits directly inside).
3. Run `/reload` in game, or reopen the world.

## Adding a ghast

Edit `data/ghaster/function/tick.mcfunction`. For a new name, add a matching pair of `remove` lines and a pair of `add` lines using a new `ghaster:<name>_boost` modifier ID. See `CLAUDE.md` for details.

## Versioning

Releases follow Minecraft's versioning style, starting at 26.1.
