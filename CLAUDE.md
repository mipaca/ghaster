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
- `Adagio` (slow): 1
- `Allegro` (medium): 2
- `Presto` (fast): 3

To add a ghast, add a remove pair, an add pair, and a matching `ghaster:<name>_boost` modifier ID in `tick.mcfunction`. Names are matched exactly and are case-sensitive.

## Bedrock add-on

`bedrock/behavior_pack/` is a separate Script API port (`scripts/main.js`). `entities/happy_ghast.json` is a copy of the vanilla entity (format 1.26.30, from Mojang/bedrock-samples) plus `ghaster:mobile_1..3` groups (full copies of `adult_mobile` with `movement` and `flying_speed` scaled by value + 1; exactly one of `adult_immobile`, `adult_mobile` and the three tier groups is active at a time), a `ghaster:tier` property and `ghaster:set_tier_N` events. `ghaster:tier` always reflects the active group (it resets to 0 whenever the ghast goes mobile/immobile), so the script retries every 2 ticks until it matches. Every 2 ticks the script sets each happy ghast's tier from its rider's name (`BOOSTS` map in `main.js`), and 0 when unridden. Only horizontal speed is boosted. Add a ghast by adding an entry to `BOOSTS`. Re-sync the entity file when vanilla changes. Untested in game.

## Notes

- Modifiers are applied to the ghast, not the player.
- This feature was moved here from the `wizards-revenge` pack, where it used `wizards_revenge:*_boost` IDs. Ghasts that still carry those old modifiers keep them until removed with `/attribute ... modifier remove`.
