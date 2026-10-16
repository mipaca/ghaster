# Ghaster

A small Minecraft Java data pack that makes named happy ghasts fly faster while a player is riding them.

Tested on Minecraft: Java Edition 1.21.11 through 26.3 (data pack formats 94.1 to 121).

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

**There is no Bedrock download at the moment.** The behavior pack includes a modified copy of Mojang's `happy_ghast` entity, which can't be redistributed under Minecraft's EULA and Usage Guidelines (see [License](#license)), so the `.mcaddon` has been withdrawn until it can work without that copy. The source stays here for reference.

To check the speeds, run `/tag @s add speedometer` for a blocks-per-second and tier readout on the action bar.

## Adding a ghast

Edit `data/ghaster/function/tick.mcfunction`. For a new name, add a matching pair of `remove` lines and a pair of `add` lines using a new `ghaster:<name>_boost` modifier ID. See `CLAUDE.md` for details.

## Versioning

Releases follow Minecraft's versioning style, starting at 26.1.

## License

Ghaster is released under the [MIT License](LICENSE), with one exception.

`bedrock/behavior_pack/entities/happy_ghast.json` is a modified copy of the vanilla `happy_ghast` entity from Mojang's [bedrock-samples](https://github.com/Mojang/bedrock-samples). That file is copyright Mojang AB, is not covered by the MIT License, and no rights to it are granted here. Its use is governed by the [Minecraft EULA](https://www.minecraft.net/en-us/eula) and [Usage Guidelines](https://www.minecraft.net/en-us/usage-guidelines). Only the `ghaster:*` groups, property and events added to it are MIT. The Java data pack does not include any Mojang files.

NOT AN OFFICIAL MINECRAFT PRODUCT. NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT.
