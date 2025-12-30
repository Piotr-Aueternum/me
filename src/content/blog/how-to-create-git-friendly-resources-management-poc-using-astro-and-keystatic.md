---
title: How to create Git-friendly Resources Management PoC using Astro & Keystatic
description: >-
  Using Astro@4 and Keystatic as Relational Resources Database for game.
  Resource is entity with data in form of file. It can be used for audio,
  images, maps, sprites or items and enemies.
publishDate: 2025-06-17
author: piotr-sochacz
categories:
  - cms
  - gamedev
  - webdev
---
Using Astro@4 and Keystatic as Relational Resources Database for game.
Resource is entity with data in form of file. It can be used for audio, images, maps, sprites or items and enemies.

We can also use other resources inside resource to create complex structures with a reference.

This concept is more known in gamedev as a Resource(Godot), ScriptableObject(Unity) or DataAsset(Unreal).

Godot code example:

```gdscript
extends Resource
class_name Enemy

@export var item_mainhand: Item
...
...
@export var experience: int = 0

var enemy = preload("res://character/enemy/enemy.tscn")

func instantiate() -> EnemyUnit:
	var enemy_instance = enemy.instantiate() as EnemyUnit
	enemy_instance.item_mainhand = item_mainhand
        ...
        ...
        enemy_instance.experience = experience

	return enemy_instance
```

We can create the script which extends the Resource class and then we can declare a properties with `@export` keyword to make them available in the editor:

![](/images/blog/how-to-create-git-friendly-resources-management-poc-using-astro-and-keystatic/Pasted%20image%2020250217232724.png)

Resources can be used in multiple ways as a repository, variable or just data structure. I plan to write another blogpost about designing them using Interface Segregation Principle.

How can we achieve similar outcome using Astro and Keystatic? For that I'm using Astro collections and I Keystatic CMS. First is native using `collection` schema.

We need to define collection in keystatic:

```typescript
units: collection({
  label: "Units",
  slugField: 'id',
  columns: ["name"],
  path: "src/content/units/*",
  format: "json",
  schema: {
	id: fields.text({
	  label: 'Id',
	  validation: {
		isRequired: true,
	  }
	}),
	name: fields.text({
	  label: 'Name',
	  validation: {
		isRequired: true,
	  }
	}),
	unit: ANfields.unit({
	  x: fields.number({
		label: 'Position X',
		validation: {
		  isRequired: true,
		}
	  }),
	  y: fields.number({
		label: 'Position Y',
		validation: {
		  isRequired: true,
		}
	  }),
	  head: selectItems({
		label: 'Head',
	  }),
	}),
  },
});
```

The other one is "hacky" which is deprecated in latest versions of astro it works only at version 4. For that case I'm using `import { getCollection } from 'astro:content';` and hybrid mode.

Then we create

```typescript
const items = await getCollection('items'); // <- collections extracted
const itemsOptions = items.map(item => ({label: item.id === '0' ? 'None' : `${item.data.name}@${item.data.slot}`, value: item.id})) // <- map for the select field

const selectItems = ({label}: {label: string}) => ({
  ...fields.select({
    label,
    options: itemsOptions,
    defaultValue: '0'
  }),
- // some parsing to convert into number to simplify access in json
  parse(value: number) {
    if (value === undefined) {
      return this.defaultValue;
    }
    return `${value}`;
  },
  serialize(value: string) {
    return { value: Number(value) };
  },
})
```

Why bothering using `getCollection` and using `fields.select`?
Well `fields.relationship` doesn't gives much freedom in control over labels it just displays slug in this case for items it would be just number which isn't helpful. But with this I can create custom label or even filter them out based on field type for e.g I could filter all non-helmet items from Head selector why would you want to wear a Sword on your head? I'm a fan of tools that will be still intuitive one year later just less things to remember and worry about because validation will handle it.

![](/images/blog/how-to-create-git-friendly-resources-management-poc-using-astro-and-keystatic/Pasted%20image%2020250217233947.png)

As you can see there is a character wearing items like sword, shield, helmet etc. I created custom field for that purpose which displays items in similar position as in game and shows how they will look or if they are correct. You can see error more easily.

![](/images/blog/how-to-create-git-friendly-resources-management-poc-using-astro-and-keystatic/Pasted%20image%2020250217234353.png)

```tsx
import { Grid, Flex } from '@keystar/ui/layout';
import { Text } from '@keystar/ui/typography';

import type { ObjectField, GenericPreviewProps, ComponentSchema } from '@keystatic/core'
import { getCollection } from 'astro:content';

const items = await getCollection('items')
const itemsMap = Object.fromEntries(items.map(item => [item.id, item]))

const cellSize = 16;

const RenderItem = ({sprite, transform}: {sprite: {
  x: number,
  y: number,
  width: number,
  height: number,
}, transform: string}) => (
  <div
    style={{
      position: 'absolute',
      width: cellSize * sprite.width,
      height: cellSize * sprite.height,
      background: `url(/items.png) ${-sprite.x * cellSize}px ${sprite.y * cellSize}px`,
      transform,
    }}
  />
)

export function UnitFieldInput<
  Fields extends Record<string, ComponentSchema>,
>({
  schema,
  fields,
}: GenericPreviewProps<ObjectField<Fields>, unknown>) {
  return (
    <Grid
      role="group"
      gap="medium"
      marginY="xlarge"
    >
      <Text
        color="neutralEmphasis"
        size="medium"
        weight="semibold"
      >
        {schema.label}
      </Text>
      <Flex gap="xxlarge">
        <Grid rowGap="xlarge">
          {Object.values(fields).map((field) => {
            const Input = field.schema.Input;
            return <Input {...field.schema} onChange={field.onChange} value={field.value} />
          })}
        </Grid>
        <div style={{
          transformOrigin: '0 0',
          transform:'scale(4)',
          imageRendering: 'pixelated',
          position: 'relative'
        }}>
          <div
            style={{
              position: 'absolute',
              width: cellSize * 3,
              height: cellSize * 2,
              background: `url(/units.png) ${-fields.x.value * cellSize * 3}px ${fields.y.value * cellSize * 2}px`,
            }}
          />
          <RenderItem
            sprite={itemsMap[fields.mainhand.value].data.sprite}
            transform={`translate(33px, -37px) rotate(-60deg)`}
          />
        </div>
      </Flex>
    </Grid>
  );
}
```

I've seen some people creating bindings to use Unity editor for their engine but I wasn't familiar with the topic and I disliked creating custom editor in Unity using Imgui as React Developer I decided to stay with Astro and Keystatic that I used in past for Git-based CMS side project. My knowledge of React helps as well to create it quickly. Setup of astro and keystatic, creating items, units schema and binding it to c++ took one day of my free time. Even more I can use that later to create a Wikipedia(Thanks [Bartosz](https://laniewski.me/) for that idea ✌🏻).

Result?

```JSON
// src/content/units/0.json
{
  "name": "Player",
  "unit": {
    "x": 0,
    "y": 0,
    "head": 3,
    "chest": 0,
    "cape": 5,
    "mainShoulder": 4,
    "offShoulder": 4,
    "mainhand": 8,
    "offhand": 6
  }
}
```

Then I can load it anywhere. In my case it will be `nlohmann::json` within C++ project.
I have unit, I have item ids equipped by that unit. Having item id I can extract item data and sprite.
