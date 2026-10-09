# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A small Minecraft Java data pack (pack format 121, game version 26.3) that makes named happy ghasts fly faster when a player is riding them. There is no build, lint, or test tooling. The pack is installed by copying the folder into a world's `datapacks/` directory (so `pack.mcmeta` sits directly inside `datapacks/ghaster`) and run with `/reload`.

## Architecture

`data/minecraft/tags/function/tick.json` runs `ghaster:tick` every game tick. `data/ghaster/function/tick.mcfunction` does two things:

1. Removes every `ghaster:<name>_boost` modifier from the `flying_speed` and `movement_speed` attributes of all happy ghasts.
2. For each player riding a happy ghast with a matching custom name, re-adds the modifier to the ghast's `flying_speed` and `movement_speed`, using `add_multiplied_base`.

Removing then re-adding means the boost only applies while someone is riding, and it ends as soon as the rider dismounts.

Current ghasts and their `add_multiplied_base` values (a value of 3 means 4x base speed):
- `Falkor`: 3
- `Pegasus`: 1
- `Toothless`: 2

To add a ghast, add a remove pair, an add pair, and a matching `ghaster:<name>_boost` modifier ID in `tick.mcfunction`. Names are matched exactly and are case-sensitive.

## Notes

- Modifiers are applied to the ghast, not the player.
- This feature was moved here from the `wizards-revenge` pack, where it used `wizards_revenge:*_boost` IDs. Ghasts that still carry those old modifiers keep them until removed with `/attribute ... modifier remove`.
