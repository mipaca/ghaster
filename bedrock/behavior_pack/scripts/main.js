import { system, world } from "@minecraft/server";

// Same tiers as the Java data pack: value N means (N + 1)x base speed.
// entities/happy_ghast.json overrides the vanilla ghast with one speed
// group per tier; the `ghaster:set_tier_N` events switch between them.
const BOOSTS = new Map([
    ["Adagio", 1],
    ["Allegro", 2],
    ["Presto", 3],
    ["Pegasus", 1],
    ["Toothless", 2],
    ["Falkor", 3],
]);

const DIMENSIONS = ["overworld", "nether", "the_end"];

system.runInterval(() => {
    const wanted = new Map();
    for (const player of world.getAllPlayers()) {
        const ghast = player.getComponent("minecraft:riding")?.entityRidingOn;
        if (ghast?.typeId !== "minecraft:happy_ghast") continue;

        const boost = BOOSTS.get(ghast.nameTag);
        if (boost !== undefined) wanted.set(ghast.id, boost);
    }

    // Also resets ghasts whose rider dismounted or was renamed.
    for (const dimension of DIMENSIONS) {
        for (const ghast of world.getDimension(dimension).getEntities({ type: "minecraft:happy_ghast" })) {
            const tier = wanted.get(ghast.id) ?? 0;
            if (ghast.getProperty("ghaster:tier") !== tier) {
                ghast.triggerEvent(`ghaster:set_tier_${tier}`);
            }
        }
    }
}, 2);

// Debug readout: `/tag @s add speedometer` to show, `/tag @s remove speedometer` to hide.
system.runInterval(() => {
    for (const player of world.getPlayers({ tags: ["speedometer"] })) {
        const ridden = player.getComponent("minecraft:riding")?.entityRidingOn;
        const target = ridden ?? player;
        const v = target.getVelocity();
        const bps = Math.hypot(v.x, v.y, v.z) * 20;
        const tier = ridden?.getProperty("ghaster:tier") ?? "-";
        player.onScreenDisplay.setActionBar(`${bps.toFixed(1)} blocks/s | tier: ${tier}`);
    }
}, 2);
