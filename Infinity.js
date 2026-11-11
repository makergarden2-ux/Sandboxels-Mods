elements.uru_metal = {
    color: ["#5c6370", "#7f8796", "#424752"],
    behavior: behaviors.WALL,
    category: "infinity",
    state: "solid",
    density: 21000,
    hardness: 1,
    conduct: 1,
    tempHigh: 5000,
    stateHigh: "molten_uru"
};

elements.molten_uru = {
    color: ["#ff7700", "#ffaa00", "#ff4400"],
    behavior: behaviors.MOLTEN,
    category: "infinity",
    state: "liquid",
    density: 19500,
    temp: 5100,
    tempLow: 4900,
    stateLow: "uru_metal"
};

elements.tesseract = {
    color: ["#00e5ff", "#84ffff", "#00b0ff"],
    behavior: behaviors.POWDER,
    category: "infinity",
    state: "solid",
    density: 3000,
    hardness: 0.7,
    breakInto: "space_stone",
    tempHigh: 1500,
    stateHigh: "space_stone",
    tick: function(pixel) {
        if (Math.random() < 0.02) {
            releaseElement(pixel, "electric");
        }
    }
};

elements.the_orb = {
    color: ["#616161", "#9e9e9e", "#9c27b0"],
    behavior: behaviors.POWDER,
    category: "infinity",
    state: "solid",
    density: 4000,
    hardness: 0.7,
    breakInto: "power_stone",
    tempHigh: 1500,
    stateHigh: "power_stone"
};

elements.eye_of_agamotto = {
    color: ["#ffd700", "#00e676", "#b8860b"],
    behavior: behaviors.POWDER,
    category: "infinity",
    state: "solid",
    density: 4500,
    hardness: 0.7,
    breakInto: "time_stone",
    tempHigh: 1500,
    stateHigh: "time_stone"
};

elements.loki_scepter = {
    color: ["#d4af37", "#00b0ff", "#ffd600"],
    behavior: behaviors.POWDER,
    category: "infinity",
    state: "solid",
    density: 4500,
    hardness: 0.7,
    breakInto: "mind_stone",
    tempHigh: 1500,
    stateHigh: "mind_stone"
};

elements.stormbreaker = {
    color: ["#b0bec5", "#78909c", "#5d4037"],
    behavior: behaviors.POWDER,
    category: "infinity",
    state: "solid",
    density: 15000,
    hardness: 1,
    conduct: 1,
    tick: function(pixel) {
        if (Math.random() < 0.1) {
            releaseElement(pixel, "lightning");
        }
        const neighbors = [
            {x: pixel.x + 1, y: pixel.y},
            {x: pixel.x - 1, y: pixel.y},
            {x: pixel.x, y: pixel.y + 1},
            {x: pixel.x, y: pixel.y - 1}
        ];
        for (let pos of neighbors) {
            if (!isEmpty(pos.x, pos.y, true) && pixelMap[pos.x] && pixelMap[pos.x][pos.y]) {
                let target = pixelMap[pos.x][pos.y];
                if (!target.element.includes("stone") && target.element !== "stormbreaker" && target.element !== "uru_metal" && target.element !== "infinity_gauntlet") {
                    if (Math.random() < 0.25) {
                        deletePixel(pos.x, pos.y);
                    }
                }
            }
        }
    }
};

elements.power_stone = {
    color: ["#9b30ff", "#bf5fff", "#7a1fa2"],
    behavior: behaviors.POWDER,
    category: "infinity",
    state: "solid",
    density: 5000,
    hardness: 0.99,
    temp: 500,
    tick: function(pixel) {
        pixel.temp += 50;
        if (Math.random() < 0.03) {
            releaseElement(pixel, "plasma");
        }
        if (Math.random() < 0.005) {
            explodeAt(pixel.x, pixel.y, 6, "plasma");
        }
    }
};

elements.space_stone = {
    color: ["#00bfff", "#1e90ff", "#87cefa"],
    behavior: behaviors.POWDER,
    category: "infinity",
    state: "solid",
    density: 5000,
    hardness: 0.99,
    tick: function(pixel) {
        const neighbors = [
            {x: pixel.x + 1, y: pixel.y},
            {x: pixel.x - 1, y: pixel.y},
            {x: pixel.x, y: pixel.y + 1},
            {x: pixel.x, y: pixel.y - 1}
        ];
        for (let pos of neighbors) {
            if (!isEmpty(pos.x, pos.y, true) && pixelMap[pos.x] && pixelMap[pos.x][pos.y]) {
                let target = pixelMap[pos.x][pos.y];
                if (!target.element.includes("stone") && target.element !== "infinity_gauntlet") {
                    let randX = Math.floor(Math.random() * (width - 2)) + 1;
                    let randY = Math.floor(Math.random() * (height - 2)) + 1;
                    if (isEmpty(randX, randY)) {
                        tryMove(target, randX, randY);
                    }
                }
            }
        }
    }
};

elements.reality_stone = {
    color: ["#ff1744", "#d50000", "#ff5252"],
    behavior: behaviors.LIQUID,
    category: "infinity",
    state: "liquid",
    density: 5000,
    hardness: 0.99,
    tick: function(pixel) {
        const randomElements = ["gold", "slime", "bubbles", "rose", "cheese", "confetti", "ash", "glass", "diamond"];
        const neighbors = [
            {x: pixel.x + 1, y: pixel.y},
            {x: pixel.x - 1, y: pixel.y},
            {x: pixel.x, y: pixel.y + 1},
            {x: pixel.x, y: pixel.y - 1}
        ];
        for (let pos of neighbors) {
            if (Math.random() < 0.08 && !isEmpty(pos.x, pos.y, true) && pixelMap[pos.x] && pixelMap[pos.x][pos.y]) {
                let target = pixelMap[pos.x][pos.y];
                if (!target.element.includes("stone") && target.element !== "infinity_gauntlet") {
                    let newElem = randomElements[Math.floor(Math.random() * randomElements.length)];
                    changePixel(target, newElem);
                }
            }
        }
    }
};

elements.soul_stone = {
    color: ["#ff9100", "#ff6d00", "#ffab40"],
    behavior: behaviors.POWDER,
    category: "infinity",
    state: "solid",
    density: 5000,
    hardness: 0.99,
    reactions: {
        "human": { elem2: "light" },
        "body": { elem2: "light" },
        "head": { elem2: "light" },
        "plant": { elem2: "light" },
        "wood": { elem2: "light" },
        "ant": { elem2: "light" },
        "fish": { elem2: "light" },
        "bird": { elem2: "light" }
    }
};

elements.time_stone = {
    color: ["#00e676", "#00c853", "#69f0ae"],
    behavior: behaviors.POWDER,
    category: "infinity",
    state: "solid",
    density: 5000,
    hardness: 0.99,
    tick: function(pixel) {
        for (let dx = -3; dx <= 3; dx++) {
            for (let dy = -3; dy <= 3; dy++) {
                let nx = pixel.x + dx;
                let ny = pixel.y + dy;
                if (!isEmpty(nx, ny, true) && pixelMap[nx] && pixelMap[nx][ny]) {
                    let target = pixelMap[nx][ny];
                    if (target.element !== "time_stone") {
                        target.temp = 20;
                        target.burning = false;
                        if (target.element === "ash") {
                            changePixel(target, "wood");
                        } else if (target.element === "rust") {
                            changePixel(target, "iron");
                        }
                    }
                }
            }
        }
    }
};

elements.mind_stone = {
    color: ["#ffd600", "#ffea00", "#ffff00"],
    behavior: behaviors.POWDER,
    category: "infinity",
    state: "solid",
    density: 5000,
    hardness: 0.99,
    conduct: 1,
    tick: function(pixel) {
        if (Math.random() < 0.05) {
            releaseElement(pixel, "electric");
        }
        let nx = pixel.x + (Math.floor(Math.random() * 5) - 2);
        let ny = pixel.y + (Math.floor(Math.random() * 5) - 2);
        if (!isEmpty(nx, ny, true) && pixelMap[nx] && pixelMap[nx][ny]) {
            let target = pixelMap[nx][ny];
            if (!target.element.includes("stone") && isEmpty(nx, ny - 1)) {
                tryMove(target, nx, ny - 1);
            }
        }
    }
};

elements.infinity_gauntlet = {
    color: ["#d4af37", "#ffd700", "#b8860b"],
    behavior: behaviors.WALL,
    category: "infinity",
    state: "solid",
    density: 19300,
    hardness: 1,
    tick: function(pixel) {
        let foundStones = new Set();
        for (let dx = -3; dx <= 3; dx++) {
            for (let dy = -3; dy <= 3; dy++) {
                let nx = pixel.x + dx;
                let ny = pixel.y + dy;
                if (!isEmpty(nx, ny, true) && pixelMap[nx] && pixelMap[nx][ny]) {
                    let elem = pixelMap[nx][ny].element;
                    if (elem.endsWith("_stone")) {
                        foundStones.add(elem);
                    }
                }
            }
        }
        if (foundStones.size >= 6) {
            for (let x = 1; x < width - 1; x++) {
                for (let y = 1; y < height - 1; y++) {
                    if (!isEmpty(x, y, true) && pixelMap[x] && pixelMap[x][y]) {
                        let p = pixelMap[x][y];
                        if (!p.element.endsWith("_stone") && p.element !== "infinity_gauntlet" && p.element !== "ash") {
                            if (Math.random() < 0.5) {
                                changePixel(p, "ash");
                            }
                        }
                    }
                }
            }
            for (let dx = -3; dx <= 3; dx++) {
                for (let dy = -3; dy <= 3; dy++) {
                    let nx = pixel.x + dx;
                    let ny = pixel.y + dy;
                    if (!isEmpty(nx, ny, true) && pixelMap[nx] && pixelMap[nx][ny]) {
                        if (pixelMap[nx][ny].element.endsWith("_stone")) {
                            deletePixel(nx, ny);
                        }
                    }
                }
            }
        }
    }
};

elements.the_snap = {
    color: ["#ffd700", "#9b30ff", "#ff1744", "#00bfff", "#00e676", "#ff9100"],
    tool: function(pixel) {
        if (!pixel.element.endsWith("_stone") && pixel.element !== "infinity_gauntlet") {
            if (Math.random() < 0.5) {
                changePixel(pixel, "ash");
            }
        }
    },
    category: "infinity",
    excludeRandom: true
};
  
