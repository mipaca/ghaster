import { EntityComponentTypes, system, world } from "@minecraft/server";

// Same tiers as the Java data pack: value N means (N + 1)x base speed.
// Prototype: speed is changed through the `minecraft:flying_speed` and
// `minecraft:movement` components, so no copy of the vanilla entity is needed.
const BOOSTS = new Map([
    ["Adagio", 1],
    ["Allegro", 2],
    ["Presto", 3],
    ["Pegasus", 1],
    ["Toothless", 2],
    ["Falkor", 3],
    ["Marshmallow", 4],
]);

const DIMENSIONS = ["overworld", "nether", "the_end"];
const BASE_FLYING = "ghaster:base_flying";
const EPSILON = 1e-6;

// `flying_speed` has no default value to reset to, so the original is kept
// in a dynamic property (saved with the entity) while a boost is applied.
function applyTier(ghast, tier) {
    const flying = ghast.getComponent(EntityComponentTypes.FlyingSpeed);
    const movement = ghast.getComponent(EntityComponentTypes.Movement);
    if (!flying || !movement) return;

    let baseFlying = ghast.getDynamicProperty(BASE_FLYING);
    if (baseFlying === undefined) {
        if (tier === 0) {
            // Nothing stored, but make sure a stray movement boost is not left behind.
            if (Math.abs(movement.currentValue - movement.defaultValue) > EPSILON) {
                movement.setCurrentValue(movement.defaultValue);
            }
            return;
        }
        baseFlying = flying.value;
        ghast.setDynamicProperty(BASE_FLYING, baseFlying);
    }

    const factor = tier + 1;
    const wantFlying = baseFlying * factor;
    const wantMovement = movement.defaultValue * factor;
    if (Math.abs(flying.value - wantFlying) > EPSILON) flying.value = wantFlying;
    if (Math.abs(movement.currentValue - wantMovement) > EPSILON) movement.setCurrentValue(wantMovement);

    if (tier === 0) ghast.setDynamicProperty(BASE_FLYING, undefined);
}

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
            try {
                applyTier(ghast, wanted.get(ghast.id) ?? 0);
            } catch (error) {
                console.warn(`ghaster: ${error}`);
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
        const flying = ridden?.getComponent(EntityComponentTypes.FlyingSpeed)?.value;
        const movement = ridden?.getComponent(EntityComponentTypes.Movement)?.currentValue;
        const attrs = ridden ? ` | fly: ${flying?.toFixed(3)} move: ${movement?.toFixed(3)}` : "";
        player.onScreenDisplay.setActionBar(`${bps.toFixed(1)} blocks/s${attrs}`);
    }
}, 2);
