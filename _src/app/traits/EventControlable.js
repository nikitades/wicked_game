export default {
    _on(_case, event) {
        this.events = this.events || {};
        if (typeof event === 'function') {
            if (!(_case in this.events)) {
                this.events[_case] = [];
            }
            this.events[_case].push(event);
        }
    },
    _fire(_case) {
        this.events = this.events || {};
        if (_case in this.events) {
            for (let i in this.events[_case]) {
                this.events[_case][i]();
            }
        }
    }
}