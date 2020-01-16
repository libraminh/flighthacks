<template>
  <section class="section styleguide">
    <div class="section__inner container padding-y-lg">
      <div class="text-component max-width-500">
        <h1 class="text-xxxl text-capitalize">
          Typography
        </h1>
        <p class="text-sm">
          {{ description }}
        </p>
      </div>
      <div class="grid grid-gap-md margin-top-lg">
        <div class="col-9 col-4@sm col-6@md flex items-center">
          <span class="text-xs text-capitalize color-contrast-medium">Example</span>
        </div>
        <div class="col-3 col-2@sm flex items-center">
          <span class="text-xs text-capitalize color-contrast-medium">Type</span>
        </div>
        <div class="col-2@sm display@sm flex items-center">
          <span class="text-xs text-capitalize color-contrast-medium">Font</span>
        </div>
        <div class="col-2@sm col-1@md display@sm flex items-center">
          <span class="text-xs text-capitalize color-contrast-medium">Font-Size</span>
        </div>
        <div class="col-2@sm col-1@md display@sm flex items-center">
          <span class="text-xs text-capitalize color-contrast-medium">Line Height</span>
        </div>
      </div>
      <div
        class="grid grid-gap-md"
        v-for="(typeface, index) in typefaces"
        :key="index"
      >
        <div class="col-9 col-4@sm col-6@md flex items-center border-bottom padding-y-md">
          <div class="text-component">
            <component
              :class="typeface.hasClass"
              :is="typeface.tag"
            >
              The quick brown fox jumps over the lazy dog
            </component>
          </div>
        </div>
        <div class="col-3 col-2@sm flex items-center border-bottom padding-y-md">
          <div class="text-sm">
            {{ typeface.type }}
          </div>
        </div>
        <div class="col-2@sm display@sm flex items-center border-bottom padding-y-md">
          <span class="text-sm">{{ typeface.font }}</span>
        </div>
        <div class="col-2@sm col-1@md display@sm flex items-center border-bottom padding-y-md">
          <span class="text-sm">{{ fontSizesValue[index] }}px</span>
        </div>
        <div class="col-2@sm col-1@md display@sm flex items-center border-bottom padding-y-md">
          <span class="text-sm">{{ typeface.lineHeight }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Typography",
    props: {
      description: {
        type: String,
        default: ""
      },
    },
    data() {
      return {
        fontSizesIndex: ['xxxl', 'xxl', 'xl', 'lg', 'md', 'base-size', 'sm'],
        typefaces: [
          {
            tag: "h1",
            type: "Heading 1",
            font: 'Be Vietnam',
            lineHeight: 1.2
          },
          {
            tag: "h2",
            type: "Heading 2",
            font: 'Be Vietnam',
            lineHeight: 1.2
          },
          {
            tag: "h3",
            type: "Heading 3",
            font: 'Be Vietnam',
            lineHeight: 1.2
          },
          {
            tag: "h4",
            type: "Heading 4",
            font: 'Be Vietnam',
            lineHeight: 1.2
          },
          {
            tag: "p",
            type: "Medium Paragraph",
            font: 'Source Sans Pro',
            lineHeight: 1.5,
            hasClass: 'text-md'
          },
          {
            tag: "p",
            type: "Paragraph",
            font: 'Source Sans Pro',
            lineHeight: 1.5
          },
          {
            tag: "p",
            hasClass: "text-sm",
            font: 'Source Sans Pro',
            lineHeight: 1.5
          },
        ]
      };
    },
    computed: {
      fontSizesValue() {
        let arr = [];

        this.fontSizesIndex.forEach(size => {
          arr.push(this.getFontSizes(size));
        });

        return arr;
      }
    },
    isChecked() {
      return true;
    },
    methods: {
      getFontSizes(size) {
        const style = window.getComputedStyle(document.documentElement);
        // After the numbers are extracted from string, they can be converted to Number format.
        const sizeValues = style.getPropertyValue(`--text-${size}`).match(/[+-]?\d+(?:\.\d+)?/g).map(Number);
        const smallRatio = sizeValues[0];
        const sizeUnit = sizeValues[1] || 1;
        const largeRatio = sizeValues.slice(2).length ? sizeValues.slice(2).reduce((a, b) => a * b) : 1;
        return (smallRatio * sizeUnit * largeRatio).toFixed(2);
      }
    },
};
</script>

<style lang="scss" scoped>
</style>
