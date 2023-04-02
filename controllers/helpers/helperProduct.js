import validator from 'validator';


export function validateProductInput(req, res, next) {
    let { name, description, imageUrl } = req.body
    try {
        if (validator.isEmpty(name) || validator.isEmpty(description) || validator.isEmpty(imageUrl)) {
            throw { message: 'All fields must be filled.' };
        }
        if (name.length < 2) {
            name = false;
            throw { message: 'Name must be at least 2 characters.' };
        };
        if (description.length < 2) {
            description = false;
            throw { message: 'Description must be at least 2 characters.' };
        };
        if (validator.isURL(imageUrl), {
            protocols: ['http', 'https', 'ftp'],
            require_tld: true,
            require_host: true,
            allow_underscores: false,
            host_whitelist: false,
            host_blacklist: false,
            allow_trailing_dot: false,
            allow_protocol_relative_urls: false,
            allow_fragments: true,
            allow_query_components: true,
            disallow_auth: false,
            validate_length: true
        }) {
            imageUrl = false;
            throw { message: 'Image URL must be a valid.' };
        };

        next();

    } catch (error) {
        const from = req.params.from;
        const data = req.body;
        data._id = req.params.productId;
        return res.render(from, {
            title: from,
            name,
            description,
            imageUrl,
            data,
            error
        })
    }


}