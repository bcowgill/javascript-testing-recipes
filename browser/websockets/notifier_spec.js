with (JS.Test) {
	describe("Notifier", function () { with (this) { addSkip(this)
		before(function () { with (this) {
			this.notifier = new Notifier()
		}})

		it("opens a socket to the given URL", function () { with (this) {
			expect("new", "WebSocket").given("ws://localhost/updates").returns({})
			notifier.listen("/updates")
		}})

		it("emits an event with data received from the socket", function () { with (this) {
			var socket = {}
			stub("new", "WebSocket").returns(socket)
			notifier.listen("/updates")

			expect(notifier, "trigger").given("update", {hello: "world"})
			socket.onmessage({data: '{"hello":"world"}'})
		}})
	}})
}
