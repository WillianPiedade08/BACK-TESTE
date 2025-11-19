const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const { sub_total, data, usuario_id } = req.body;

        if (!usuario_id) {
            return res.status(400).json({ error: "usuario_id é obrigatório" });
        }

        const pedido = await prisma.pedido.create({
            data: {
                sub_total: Number(sub_total),
                data: data ? new Date(data) : new Date(),
                usuario: {
                    connect: { id: Number(usuario_id) }
                }
            },
            include: {
                usuario: true,
                itens: true
            }
        });

        return res.status(201).json(pedido);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const read = async (req, res) => {
    const pedidos = await prisma.pedido.findMany({
        include: {
            usuario: true,
            itens: {
                include: {
                    produto: true
                }
            }
        }
    });
    res.json(pedidos);
};

const update = async (req, res) => {
    try {
        const pedido = await prisma.pedido.update({
            where: { pedido_id: Number(req.params.id) },
            data: req.body,
        });
        return res.status(202).json(pedido);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const remove = async (req, res) => {
    try {
        await prisma.pedido.delete({
            where: { pedido_id: Number(req.params.id) }
        });
        return res.status(204).send();
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
};

module.exports = { create, read, update, remove };
