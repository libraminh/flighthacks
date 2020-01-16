<template>
  <form id="navbar-search" :action="formAction" :method="formMethod" class="position-relative" _lpchecked="1">
    <div ref="search" class="search">
      <svg @click="handleSearchBar" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="search__submit z-index-1">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.6004 11.2001C13.4792 10.0302 14 8.57591 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14C8.57591 14 10.0302 13.4792 11.2001 12.6004C11.2281 12.6376 11.259 12.6733 11.2929 12.7071L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L12.7071 11.2929C12.6733 11.259 12.6376 11.2281 12.6004 11.2001ZM7 12C4.23858 12 2 9.76142 2 7C2 4.23858 4.23858 2 7 2C9.76142 2 12 4.23858 12 7C12 9.76142 9.76142 12 7 12Z" fill="#ED1F5F"></path>
      </svg>

      <input @blur="handleBlur" ref="search_input" aria-label="search" type="text" placeholder="Flight" value="" name="s" class="search__input text-sm">
      <input type="hidden" name="lang" value="en">
    </div>
  </form>
</template>

<script>
  export default {
    name: 'SearchExpand',
    props: {
      formAction: {
        type: String,
        default: '/'
      },
      formMethod: {
        type: String,
        default: 'get'
      }
    },
    methods: {
      handleBlur() {
        if (this.$refs['search_input'].value.trim().length !== 0) return;
        this.$refs['search'].classList.remove('expand-search');
      },
      handleSearchBar() {
        this.$refs['search'].classList.add('expand-search');
        this.$refs['search_input'].focus();
      }
    },
  }
</script>

<style lang="scss" scoped>
  $clr-primary: #ee6352;
  $clr-body: #333;
  $clr-bg: #ddd;
  $color-white: #fff;
  $size: 30px;

  .search {
    border: 2px solid transparent;
    display: flex;
    align-items: center;
    border-radius: 100px;
    background: $color-white;
    overflow: hidden;
    font-size: 1.25em;
    position: relative;
    width: $size;
    height: $size;
    // margin-left: auto;
    transition: all 450ms cubic-bezier(0.18, 0.89, 0.32, 1.28);
    margin-right: 10px;
  }

  .search__input {
    border: 0;
    padding: .25em 1em;
    flex-grow: 1;
    outline: 0;
    z-index: 2;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    background: transparent;
    opacity: 0;
    cursor: pointer;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  .search__submit {
    margin: {
      left: auto;
      right: 5px;
    }
    z-index: 10;
    background: $color-white;
    border: 0;
    cursor: pointer;
    transition: background 200ms ease-out;
    // color: $clr-body;
  }

  .search {
    &.expand-search {
      // box-shadow: 0 0 5px var(--clr-primary);
      // width: 100%;
      width: 200px;
      border-color: $clr-primary;
      
      .search__input {
        opacity: 1;
        z-index: initial;
        cursor: initial;
        width: calc(100% - #{$size});
      }
      
      .search__submit {
        // background: $clr-primary;
        // color: white;
        // box-shadow: 0 0 10px rgba(0,0,0,.15);
        // transition: transform 500ms ease-out;
        
        &:hover,
        &:focus {
          outline: 0;
          // transform: rotate(1turn);
          // box-shadow: 0 0 10px rgba(0,0,0,.65);
        }
      }
    }
  }
</style>