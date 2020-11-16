<template>
  <div class="base-editor">
    <textarea ref="textarea" />
  </div>
</template>

<script>
import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/rubyblue.css'
import 'codemirror/mode/javascript/javascript'

export default {
  name: 'BaseCodeEditor',
  /* eslint-disable vue/require-prop-types */
  props: ['value'],
  data() {
    return {
      jsonEditor: false
    }
  },
  watch: {
    value(value) {
      const editorValue = this.baseCodeEditor.getValue()
      if (value !== editorValue) {
        if (typeof this.value === 'string') {
          this.baseCodeEditor.setValue(this.value)
        } else {
          this.baseCodeEditor.setValue(JSON.stringify(this.value, null, 2))
        }
      }
    }
  },
  mounted() {
    this.baseCodeEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
      lineNumbers: true,
      mode: 'application/json',
      gutters: ['CodeMirror-lint-markers'],
      theme: 'rubyblue',
      lint: true
    })
    if (typeof this.value === 'string') {
      this.baseCodeEditor.setValue(this.value)
    } else {
      this.baseCodeEditor.setValue(JSON.stringify(this.value, null, 2))
    }
    this.baseCodeEditor.on('change', cm => {
      this.$emit('changed', cm.getValue())
      this.$emit('input', cm.getValue())
    })
  },
  methods: {
    getValue() {
      return this.baseCodeEditor.getValue()
    }
  }
}
</script>

<style scoped>
.base-editor{
  height: 100%;
  position: relative;
}
.base-editor >>> .CodeMirror {
  height: auto;
  min-height: 240px;
}
.base-editor >>> .CodeMirror-scroll{
  min-height: 240px;
}
.base-editor >>> .cm-s-rubyblue span.cm-string {
  color: #F08047;
}
</style>
