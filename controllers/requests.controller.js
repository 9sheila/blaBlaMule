const Request = require('../models/request.model');
const User = require('../models/user.model');

module.exports.sendRequest = (req, res, next) => {
    const requestData = {
        userSending: req.currentUser,
        userReceiving: req.params.id,
        ...req.body
    }


    Request.create(requestData)
        .then((request) => {
            res.json(request)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({ error: 'Error al enviar la solicitud' });
        })
}

module.exports.getRequests = (req, res, next) => {
    const userId = req.currentUser;

    Request.find({ userReceiving: userId, status: 'pending' })
        .populate('userSending')
        .then((requests) => {
            res.json(requests)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({ error: 'Error al recibir las solicitudes' });
        })
}

module.exports.respondToRequest = (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;

    console.log(req.body)

    Request.findByIdAndUpdate(id, { status }, { new: true })
        .then((updatedRequest) => {
            console.log('actualizado!')
            res.json(updatedRequest)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({ error: 'Error al actualizar la solicitud' });
        })
}

module.exports.getConnected = (req, res, next) => {
    Request.find({ $or: [{ userSend: req.currentUser }, { userReceive: req.currentUser }], status: 'accepted' })
        .then((requests) => {
            const connectedIds = requests.reduce((ids, request) => {
                if (request.userSend.toString() === req.currentUser) {
                    ids.push(request.userReceive);
                } else {
                    ids.push(request.userSend);
                }
                return ids;
            }, []);

            return User.find({ _id: { $in: connectedIds } })
                
                .then((conexions) => {
                    res.json(conexions)
                })
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({ error: 'Error al obtener los usuarios.' });
        })
}


module.exports.getPendingRequests = (req, res, next) => {
    FriendRequest.find({
        $or: [
            { userSend: req.currentUser },
            { userReceive: req.currentUser }
        ],
        status: 'pending'
    })
        .then((pendingRequests) => {
            res.json(pendingRequests)
        })
        .catch((err) => {
            res.status(500).json({ error: 'Error al obtener las solicitudes pendientes.' });
        })
}

module.exports.cancelRequest = (req, res, next) => {
    const { id } = req.params;

    Request.findByIdAndDelete(id)
        .then((request) => {
            res.status(204).json({ status: "ok" })
        })
        .catch((err) => {
            res.status(500).json({ error: 'Error al cancelar la conexión.' });
        })
}

module.exports.getAcceptedRequest = (req, res, next) => {
    const currentUser = req.currentUser;
    Request.find({
        userSending: currentUser,
        status: 'accepted',
        dismissed: false
    })
    .populate('userReceiving')
        .then((acceptedRequest) => {
            res.json(acceptedRequest)
        })
        .catch((err) => {
            res.status(500).json({ error: 'Error al obtener las solicitudes aceptadas.' });
        })
}

module.exports.onDismissedReq = (req, res, next) => {
    const requestId = req.params.id;

    console.log(requestId)
  
    Request.findByIdAndUpdate(requestId, { dismissed: true }, { new: true })
      .then((updatedRequest) => {
        if (!updatedRequest) {
          return res.status(404).json({ message: 'Request not found.' });
        }
  
        res.json({ message: 'Request dismissed successfully.', updatedRequest });
      })
      .catch((error) => {
        console.error('Error updating request:', error);
        res.status(500).json({ error: 'Internal server error.' });
      });
  };