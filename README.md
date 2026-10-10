# Ghaster

A small Minecraft Java data pack that makes named happy ghasts fly faster while a player is riding them.

Pack format 121 (game version 26.x).

## Speed boosts

Name a happy ghast (with a name tag) to give it a boost. Names are case-sensitive.

| Name       | Tempo  | Speed |
|------------|--------|-------|
| `Adagio`   | slow   | 2x    |
| `Allegro`  | medium | 3x    |
| `Presto`   | fast   | 4x    |

Or use a character name:

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

## Bedrock add-on

`bedrock/behavior_pack/` is a Bedrock version of the same idea, using the Script API. It uses the same names and speeds, applied by switching the ghast between speed tiers (it overrides the vanilla `minecraft:happy_ghast` entity) while someone is riding it. All directions are boosted, including up and back.

To install, download `ghaster-<version>.mcaddon` from the [latest release](https://github.com/mipaca/ghaster/releases/latest) and open it with Minecraft, then enable the behavior pack on your world. Turn on Beta APIs only if your game version requires it for `@minecraft/server`.

To check the speeds, run `/tag @s add speedometer` for a blocks-per-second and tier readout on the action bar.

## Adding a ghast

Edit `data/ghaster/function/tick.mcfunction`. For a new name, add a matching pair of `remove` lines and a pair of `add` lines using a new `ghaster:<name>_boost` modifier ID. See `CLAUDE.md` for details.

## Versioning

Releases follow Minecraft's versioning style, starting at 26.1.
