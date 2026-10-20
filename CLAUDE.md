# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A small Minecraft Java data pack (`pack.mcmeta` declares formats 94.1 to 121, tested on game versions 1.21.11 through 26.3) that makes named happy ghasts fly faster when a player is riding them. There is no build, lint, or test tooling. The pack is installed by copying the folder into a world's `datapacks/` directory (so `pack.mcmeta` sits directly inside `datapacks/ghaster`) and run with `/reload`.

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

`bedrock/behavior_pack/` is a separate Script API port (`scripts/main.js`) with no entity files and no copy of any vanilla file. Every 2 ticks the script finds each happy ghast with a named rider (`BOOSTS` map in `main.js`, value N means (N + 1)x) and sets its `minecraft:flying_speed` and `minecraft:movement` components to the base value times that multiple. `movement` has a default to restore from. `flying_speed` does not, so the original is stored in the `ghaster:base_flying` dynamic property (saved with the entity) while a boost is on, and restored and cleared when the rider leaves. Each pass compares the real values instead of trusting stored state, so a ghast left boosted after a reload is corrected. Add a ghast by adding an entry to `BOOSTS`. `/tag @s add speedometer` shows blocks/s plus the live `fly` and `move` values on the action bar.

Tested in game by the user: speeds match the Java pack. Multi-rider, seat swaps, and save/reload while riding are not confirmed. It is released as `ghaster-26.1.mcpack` on the 26.1 GitHub release (not on Modrinth, which is Java-only). The `.mcpack` is a zip with `manifest.json` at its root (not inside a folder), `pack_icon.png`, `scripts/` and `LICENSE`. Double-click import of it did not work on the user's Parallels Windows VM, while copying the folder into `development_behavior_packs` did, so the README documents both. Only rebuild or replace the release asset when the user asks. The first version overrode the vanilla `happy_ghast` entity with a modified copy and was replaced for the licensing reasons below; that copy exists only in git history.

### Bedrock licensing: do not redistribute Mojang content

The Minecraft EULA and Usage Guidelines allow distributing a "mod" only if it is original and contains no substantial part of Mojang's code or content, and they forbid redistributing alterations of game files. The add-on now ships only original files (manifest, script, icon). **Do not reintroduce `entities/happy_ghast.json` or any other copy of a vanilla file.**

Rules for any Bedrock add-on built here:
- Ship only original files: scripts, manifest, and entity/behavior fragments we wrote ourselves. Do not copy vanilla entities, behaviors, textures, models, sounds, or other files from `bedrock-samples` or the game into a release.
- Prefer approaches that need no vanilla override (the Script API component approach above) over editing a copy of `minecraft:happy_ghast`.
- Before building a `.mcaddon` or `.mcpack`, check that no file in it is a vanilla copy.
- Releases need the disclaimer "NOT AN OFFICIAL MINECRAFT PRODUCT. NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT." (see `LICENSE` and the README License section).
- `pack_icon.png` and the Java `pack.png` are the same hand-made Photoshop image (replaced the earlier AI-generated icons on 2026-10-19), so Modrinth's ban on AI-generated images no longer applies to them.
- Distribute the mod only, free of charge, with no pay-to-play or out-of-game content checks.

## Notes

- Modifiers are applied to the ghast, not the player.
- This feature was moved here from the `wizards-revenge` pack, where it used `wizards_revenge:*_boost` IDs. Ghasts that still carry those old modifiers keep them until removed with `/attribute ... modifier remove`.
