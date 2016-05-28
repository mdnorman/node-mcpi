## ![mcpi](https://raw.github.com/mdnorman/mcpi/master/minecraft-pi.png)

mcpi allows you to control [Minecraft: Raspberry Pi edition](http://pi.minecraft.net/) server from Node.js. This is intended as a lower-level module, and is meant to be extended on for bigger projects. However, the commands are simple enough to play with as-is.

### Usage

    const mcpi = require('mcpi');
    const mc = new mcpi.Minecraft('localhost', 4711);
    
    // Use the mc variable to play with the server!
    mc.chat('Yo dawg, I heard you like Node.js, so I put some Node.js in your Pi so you can Node.js while you Pi.');
    mc.setBlock(3, 14, 15, mc.blocks['DIAMOND_BLOCK']);
    mc.end();
    
    // Use the returned promises to wait for results
    mc.getBlock(3, 14, 15)
      .then(block => {
        console.log('blockId:', block.id);
      })
      .then(() => {
        mc.end();
      });

### Documentation

```bash
npm run doc
open tmp/docs/minecraft.html
```

You may also view pre-generated documentation [here](http://mdnorman.github.io/mcpi/).
