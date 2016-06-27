## ![mcpi](https://raw.github.com/mdnorman/node-mcpi/master/minecraft-pi.png)

mcpi allows you to control [Minecraft: Raspberry Pi edition](http://pi.minecraft.net/) server from Node.js. This is intended as a lower-level module, and is meant to be extended on for bigger projects. However, the commands are simple enough to play with as-is.

### Usage

    const mcpi = require('mcpi');
    const mc = new mcpi.Minecraft('localhost', 4711);
    
    // Use the mc variable to play with the server!
    mc.chat.post('Yo dawg, I heard you like Node.js, so I put some Node.js in your Pi so you can Node.js while you Pi.');
    mc.world.setBlock(3, 14, 15, mcpi.blocks.DiamondBlock);
    mc.close();
    
    // Use the returned promises to wait for results
    mc.world.getBlock(3, 14, 15)
      .then(block => {
        console.log('blockId:', block.id);
      })
      .then(() => {
        mc.close();
      });
      
### Debug logs

To turn on debug logging, run your program with NODE_DEBUG set to `mcpi`
