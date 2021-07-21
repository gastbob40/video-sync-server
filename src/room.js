class Room {

    constructor(pageUrl) {

        if (pageUrl === undefined)
            throw 'pageUrl must be defined';

        this.code = "";
        for (let i = 0; i < 6; i++)
            this.code += Math.floor(Math.random() * 10)

        this.members = [];
        this.pageUrl = pageUrl;
    }

}

module.exports = Room