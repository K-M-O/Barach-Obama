FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode,
)

FilePond.setOptions({
    itemInsertLocation: "after",
    imagePreviewHeight: '100px',
    imagePreviewWidth: '100px'
})

const inputElement = document.querySelector('input[type="file"]')

FilePond.create( inputElement, {
    maxFiles:6,
    allowMultiple: true
})

FilePond.parse(document.body)