<template>
  <div>
    <section class="section styleguide">
      <div class="section__inner container padding-y-lg">
        <div class="text-component max-width-500">
          <h1 class="text-xxxl text-capitalize">
            Colors
          </h1>
          <p class="text-sm">
            We've enhanced semantic color selection with brighter color variations in order to improve the contrast and accessibility.
          </p>
        </div>

        <div class="grid grid-gap-md margin-top-lg">
          <div
            class="col-12 col-6@xs col-3@sm position-relative"
            v-for="(color, index) in colors"
            :key="index"
          >
            <div class="styleguide__card border border-default">
              <div
                class="margin-x-auto shadow-xs width-100%"
                :style="{paddingBottom: '100%', backgroundColor: 'var(--color-' + color.name.toLowerCase() + ')' }"
              />
            </div>
            <ul
              class="d-flex flex-center"
              v-if="color.palette"
            >
              <li 
                v-for="(shade) in colorShades" 
                :key="shade"
                class="width-100%"
              >
                <div
                  class="margin-x-auto"
                  :style="{
                    marginTop: '-100%',
                    paddingBottom: '100%',
                    backgroundColor: `var(--color-${color.name.toLowerCase()}${shade})`
                  }"
                />
              </li>
            </ul>
            <div class="text-component v-space-xxs text-center margin-top-xs">
              <p class="text-xs has-no-margin color-contrast-medium">
                {{ color.name }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section styleguide">
      <div class="section__inner container padding-y-lg">
        <div class="text-component">
          <h3 class="text-capitalize">
            Contrast scale
          </h3>
        </div>

        <ul class="d-flex flex-wrap margin-top-lg border border-default">
          <li 
            v-for="(contrast) in contrastScale" 
            :key="contrast"
            class="col"
          >
            <div
              class="width-100% padding-top-lg"
              :style="{ backgroundColor: `var(--color-${contrast})` }"
            />
          </li>
        </ul>
      </div>
    </section>

    <section class="section styleguide styleguide--viewLayout has-no-border">
      <div class="section__inner container padding-top-lg has-no-border">
        <div class="text-component margin-bottom-lg">
          <h3 class="text-capitalize">
            Themes
          </h3>
        </div>
        <div
          v-for="(theme, index) in themes"
          :key="index"
        >
          <div
            class="section__inner padding-lg width-100% bg-default"
            :data-theme="theme.name"
          >
            <div class="text-component">
              <h2>Headings Color Contrast</h2>
              <p class="margin-top-md">
                Body Color Contrast Apparently we had reached a great height in <a href="">the atmosphere</a>, for the sky was a dead black, and the stars had ceased to twinkle.
              </p>
            </div>
            <div class="margin-top-lg flex flex-gap-sm flex-wrap">
              <component
                v-for="(button, i) in theme.buttons"
                :key="i"
                :class="button.hasClass"
                :is="button.tag"
              >
                {{ button.label }}
              </component>
            </div>
          </div>
          <div class="section__inner styleguide__footer width-100%">
            <div class="text-component">
              <h2 class="styleguide__small">
                {{ theme.name }}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
    name: "Colors",
    props: {},
    data() {
        return {
          description: "We've enhanced semantic color selection with brighter color variations in order to improve the contrast and accessibility.",
          colors: [
            {
              name: "primary",
              palette: true
            },
            {
              name: "accent",
              palette: true
            },
            {
              name: "text",
              palette: true
            },
            {
              name: "black",
              palette: false
            },
            {
              name: "white",
              palette: false
            }
          ],
          colorShades: ['-lighter', '-light', '', '-dark', '-darker'],
          contrastScale: ['bg', 'contrast-lower', 'contrast-low', 'contrast-medium', 'contrast-high', 'contrast-higher'],
          themes: [
            {
              name: "default",
              buttons: [{
                tag: "a",
                hasClass: "btn btn--primary",
                label: "Primary"
              }]
            },
            {
              name: "accent",
              buttons: [
                {
                  tag: "a",
                  hasClass: "btn btn--primary",
                  label: "Primary"
                },
                {
                  tag: "a",
                  hasClass: "btn btn--accent",
                  label: "Accent"
                },
              ]
            },
            {
              name: "gray",
              buttons: [{
                tag: "a",
                hasClass: "btn btn--primary",
                label: "Primary"
              }]
            },
          ]
        };
    },
    computed: {
        activePaletteColors: function () {
            return this.colors.filter(function (color) {
                return color.palette;
            });
        }
    }
};
</script>

<style lang="scss" scoped>
</style>
