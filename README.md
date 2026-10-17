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

`bedrock/behavior_pack/` is a Bedrock version of the same idea, using only the Script API. It uses the same names and speeds, applied by changing the ridden ghast's `flying_speed` and `movement` values from a script. It contains no Mojang files.

To install, download `ghaster-<version>.mcpack` from the [latest release](https://github.com/mipaca/ghaster/releases/latest) and open it with Minecraft, then enable the behavior pack on your world. If opening the file does nothing, rename it to `.zip`, unzip it into a new folder inside your Bedrock `development_behavior_packs` folder, and enable it from the world's Behavior Packs tab.

To check the speeds, run `/tag @s add speedometer` for a blocks-per-second readout on the action bar, along with the live speed values.

## Adding a ghast

Edit `data/ghaster/function/tick.mcfunction`. For a new name, add a matching pair of `remove` lines and a pair of `add` lines using a new `ghaster:<name>_boost` modifier ID. See `CLAUDE.md` for details.

## Versioning

Releases follow Minecraft's versioning style, starting at 26.1.

## License

Ghaster is released under the [MIT License](LICENSE). Neither the Java data pack nor the Bedrock behavior pack includes any Mojang files. Minecraft is subject to the [Minecraft EULA](https://www.minecraft.net/en-us/eula) and [Usage Guidelines](https://www.minecraft.net/en-us/usage-guidelines).

NOT AN OFFICIAL MINECRAFT PRODUCT. NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT.
