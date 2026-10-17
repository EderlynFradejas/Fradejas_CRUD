/*
    MIT License
    
    Copyright (c) 2025 Christian I. Cabrera || XianFire Framework
    Mindoro State University - Philippines

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    */
import { Movie } from "../models/Movie.js";

const movie = {
    // CREATE
    apiInsert: async (req, res) => {
        try {
            const { title, director, genre, releaseYear, rating } = req.body;
            const data = await Movie.create({ title, director, genre, releaseYear, rating });
            res.status(201).json({ success: true, message: "Movie created", data });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    },

    // READ ALL
    apiIndex: async (req, res) => {
        try {
            const data = await Movie.findAll();
            res.json({ success: true, data });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },

    // READ ONE
    apiShow: async (req, res) => {
        try {
            const data = await Movie.findByPk(req.params.id);
            if (!data) {
                return res.status(404).json({ success: false, message: "Movie not found" });
            }
            res.json({ success: true, data });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },

    // UPDATE
    apiUpdate: async (req, res) => {
        try {
            const data = await Movie.findByPk(req.params.id);
            if (!data) {
                return res.status(404).json({ success: false, message: "Movie not found" });
            }
            const { title, director, genre, releaseYear, rating } = req.body;
            await data.update({ title, director, genre, releaseYear, rating });
            res.json({ success: true, message: "Movie updated", data });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    },

    // DELETE
    apiDelete: async (req, res) => {
        try {
            const data = await Movie.findByPk(req.params.id);
            if (!data) {
                return res.status(404).json({ success: false, message: "Movie not found" });
            }
            await data.destroy();
            res.json({ success: true, message: "Movie deleted" });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },
};

export { movie };