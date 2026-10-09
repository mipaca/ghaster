execute as @e[type=minecraft:happy_ghast] run attribute @s minecraft:flying_speed modifier remove ghaster:falkor_boost
execute as @e[type=minecraft:happy_ghast] run attribute @s minecraft:movement_speed modifier remove ghaster:falkor_boost
execute as @e[type=minecraft:happy_ghast] run attribute @s minecraft:flying_speed modifier remove ghaster:pegasus_boost
execute as @e[type=minecraft:happy_ghast] run attribute @s minecraft:movement_speed modifier remove ghaster:pegasus_boost
execute as @e[type=minecraft:happy_ghast] run attribute @s minecraft:flying_speed modifier remove ghaster:toothless_boost
execute as @e[type=minecraft:happy_ghast] run attribute @s minecraft:movement_speed modifier remove ghaster:toothless_boost

execute as @a on vehicle if entity @s[type=minecraft:happy_ghast,name="Falkor"] run attribute @s minecraft:flying_speed modifier add ghaster:falkor_boost 3 add_multiplied_base
execute as @a on vehicle if entity @s[type=minecraft:happy_ghast,name="Falkor"] run attribute @s minecraft:movement_speed modifier add ghaster:falkor_boost 3 add_multiplied_base
execute as @a on vehicle if entity @s[type=minecraft:happy_ghast,name="Pegasus"] run attribute @s minecraft:flying_speed modifier add ghaster:pegasus_boost 1 add_multiplied_base
execute as @a on vehicle if entity @s[type=minecraft:happy_ghast,name="Pegasus"] run attribute @s minecraft:movement_speed modifier add ghaster:pegasus_boost 1 add_multiplied_base
execute as @a on vehicle if entity @s[type=minecraft:happy_ghast,name="Toothless"] run attribute @s minecraft:flying_speed modifier add ghaster:toothless_boost 2 add_multiplied_base
execute as @a on vehicle if entity @s[type=minecraft:happy_ghast,name="Toothless"] run attribute @s minecraft:movement_speed modifier add ghaster:toothless_boost 2 add_multiplied_base
