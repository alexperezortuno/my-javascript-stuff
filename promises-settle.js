Promise.settle = (promises) => {
	function PromiseInspection(fulfilled, val) {
		return {
			isFulfilled: () => {
				return fulfilled;
			}, isRejected: () => {
				return !fulfilled;
			}, isPending: () => {
				return false;
			}, value: () => {
				if (!fulfilled)
					throw new Error("Can't call .value() on a promise that is not fulfilled");
				return val;
			}, reason: () => {
				if (fulfilled)
					throw new Error("Can't call .reason() on a promise that is fulfilled");
				return val;
			}
			};
		}

	return Promise.all(promises.map((p) => {
        // make sure any values are wrapped in a promise
        return Promise.resolve(p).then((val) => {
        	return new PromiseInspection(true, val);
        }, (err) => {
        	return new PromiseInspection(false, err);
        });
    }));
};

Promise.settle2 = function(promises, rejectVal = null) {
	return Promise.all(promises.map(function(p) {
		// Wrappeamos todas las `promises` usando Promise.resolve
		// Para asegurarnos que todo sea una promise, `thenable` para que no haya errores!.
		return Promise.resolve(p).then(null, function(err) {
		// En lugar de reject, simplemente devolvamos `rejectVal` (null/0/""/{})
			return rejectVal;
		});
	}));
};
