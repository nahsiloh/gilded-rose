const { Shop, Item } = require("../src/gilded-rose");

describe("Gilded Rose", () => {
  it("should degrade the quality twice as fast after sell by date", () => {
    const itemName = "Normal Item";
    const itemSellIn = 0;
    const itemQuality = 5;
    const shop = new Shop([new Item(itemName, itemSellIn, itemQuality)]);

    const items = shop.updateQuality();

    expect(items[0]).toEqual(new Item("Normal Item", -1, 3));
  });

  it("should not decrease an item's quality below zero", () => {
    const itemName = "Normal Item";
    const itemSellIn = 0;
    const itemQuality = 0;
    const shop = new Shop([new Item(itemName, itemSellIn, itemQuality)]);
    const items = shop.updateQuality();

    expect(items[0]).toEqual(new Item("Normal Item", -1, 0));
  });

  describe("Aged Brie", () => {
    it("should increase the quality the older it gets", () => {
      const shop = new Shop([new Item("Aged Brie", 0, 0)]);
      const items = shop.updateQuality();

      expect(items[0]).toEqual(new Item("Aged Brie", -1, 2));
    });

    it("should not increase an item's quality above 50", () => {
      const shop = new Shop([new Item("Aged Brie", 0, 50)]);
      const items = shop.updateQuality();

      expect(items[0]).toEqual(new Item("Aged Brie", -1, 50));
    });
  });

  describe("Sulfuras, Hand of Ragnaros", () => {
    it("should not decrease or increase the sell in or quality of Sulfuras a legendary item with quality < 50 ", () => {
      const shop = new Shop([new Item("Sulfuras, Hand of Ragnaros", 5, 30)]);
      const items = shop.updateQuality();

      expect(items[0]).toEqual(new Item("Sulfuras, Hand of Ragnaros", 5, 30));
    });

    it("should not decrease or increase the sell in or quality of Sulfuras a legendary item with quality > 50", () => {
      const shop = new Shop([new Item("Sulfuras, Hand of Ragnaros", 5, 80)]);
      const items = shop.updateQuality();

      expect(items[0]).toEqual(new Item("Sulfuras, Hand of Ragnaros", 5, 80));
    });
  });

  describe("Backstage passes", () => {
    it("should increase the quality by 2, 10 - 6 days before the concert", () => {
      const shop = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 7, 10)
      ]);
      const items = shop.updateQuality();

      expect(items[0]).toEqual(
        new Item("Backstage passes to a TAFKAL80ETC concert", 6, 12)
      );
    });

    it("should increase the quality by 1, more than 10 days before the concert", () => {
      const shop = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 11, 10)
      ]);
      const items = shop.updateQuality();

      expect(items[0]).toEqual(
        new Item("Backstage passes to a TAFKAL80ETC concert", 10, 11)
      );
    });

    it("should increase the quality by 3, 5 - 1 day before the concert", () => {
      const shop = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10)
      ]);
      const items = shop.updateQuality();

      expect(items[0]).toEqual(
        new Item("Backstage passes to a TAFKAL80ETC concert", 4, 13)
      );
    });

    it("should decrease the quality to 0, after the concert", () => {
      const shop = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10)
      ]);
      const items = shop.updateQuality();

      expect(items[0]).toEqual(
        new Item("Backstage passes to a TAFKAL80ETC concert", -1, 0)
      );
    });
  });

  // describe("conjured", () => {
  //   it("should decrease the quality twice as fast as normal items before expiry", () => {
  //     const shop = new Shop([new Item("conjured", 5, 10)]);
  //     const items = shop.updateQuality();

  //     expect(items[0]).toEqual(new Item("conjured", 4, 8));
  //   });

  //   it("should decrease the quality twice as fast as normal items after expiry", () => {
  //     const shop = new Shop([new Item("conjured", 5, 10)]);
  //     const items = shop.updateQuality();

  //     expect(items[0]).toEqual(new Item("conjured", 4, 8));
  //   });
  // });
});
