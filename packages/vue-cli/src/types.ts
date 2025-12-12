export interface HanuiVueConfig {
  $schema?: string;
  style: string;
  tailwind: {
    config: string;
    css: string;
    baseColor: string;
    cssVariables: boolean;
    version: 3 | 4;
  };
  aliases: {
    components: string;
    utils: string;
    ui?: string;
    lib?: string;
  };
}
