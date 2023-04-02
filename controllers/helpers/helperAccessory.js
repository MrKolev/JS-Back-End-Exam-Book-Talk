export function validateAccessory(req, res, next) {
    const { name, description, imageUrl } = req.body
    if (!name || !description || !imageUrl) {
        return res.render("createAccessory", {
            title: "Create Accessory",
            name: name,
            description: description,
            imageUrl: imageUrl,
            data: req.body
        })
    }
    next();
}