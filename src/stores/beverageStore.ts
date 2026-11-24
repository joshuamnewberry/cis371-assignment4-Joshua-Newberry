import { defineStore } from "pinia";
import bases from "../data/bases.json";
import creamers from "../data/creamers.json";
import syrups from "../data/syrups.json";
import tempretures from "../data/tempretures.json";
import type {
  BaseBeverageType,
  CreamerType,
  SyrupType,
  BeverageType,
} from "../types/beverage";

export const useBeverageStore = defineStore("BeverageStore", {
  state: () => ({
    temps: tempretures,
    bases: bases as BaseBeverageType[],
    creamers: creamers as CreamerType[],
    syrups: syrups as SyrupType[],
    currentTemp: tempretures[0],
    currentBase: bases[0] as BaseBeverageType,
    currentCreamer: creamers[0] as CreamerType,
    currentSyrup: syrups[0] as SyrupType,
    currentName: "",
    beverages: [] as BeverageType[],
    currentBeverage: null as BeverageType | null,
  }),

  actions: {
    makeBeverage() {
      const name = this.currentName.trim();
      if (!name) return;

      const beverage: BeverageType = {
        id: `bev-${Date.now()}`,
        name,
        temp: this.currentTemp,
        base: this.currentBase,
        syrup: this.currentSyrup,
        creamer: this.currentCreamer,
      };
      this.beverages.push(beverage);
      this.currentBeverage = beverage;
      this.currentName = "";
    },

    showBeverage(beverage: BeverageType) {
      this.currentBeverage = beverage;
      this.currentTemp = beverage.temp;
      // look up by id so the selection matches the ingredient lists, not a persisted copy
      this.currentBase =
        this.bases.find((b) => b.id === beverage.base.id) ?? beverage.base;
      this.currentSyrup =
        this.syrups.find((s) => s.id === beverage.syrup.id) ?? beverage.syrup;
      this.currentCreamer =
        this.creamers.find((c) => c.id === beverage.creamer.id) ??
        beverage.creamer;
    },
  },
  persist: true,
});
