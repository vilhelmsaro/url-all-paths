function OutputEntity(props) {
    return {
        _website: [props.website],
        _link: [props.link],
        _statusCode: [props.statusCode],
    }
}

module.exports = OutputEntity;
