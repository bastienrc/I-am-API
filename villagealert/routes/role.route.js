import express from 'express'
import { authentication, authorization } from '../controllers/auth.controller.js'
import { addRole, getRole, getRoles, updateRole, deleteRole } from '../controllers/role.controller.js'
const router = express.Router()

/**
 * @openapi
 * /api/roles/:
 *   post:
 *     description: Ajout d'un role
 *     tags: [Gestion des roles]
 *     parameters:
 *       - name: roleName
 *         description: Nom du role
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: ...
 *       400:
 *         description: ERROR
 *       401:
 *         description: Unauthorized, vous n'êtes pas connecté
 */
router.post('', authentication, authorization, addRole)

/**
 * @openapi
 * /api/roles/:id:
 *   get:
 *     description: voir un role
 *     tags: [Gestion des roles]
 *     responses:
 *       200:
 *         description: ...
 *       400:
 *         description: error
 *       401:
 *         description: Unauthorized, vous n'êtes pas connecté
 *
 */
router.get('/:id', authentication, authorization, getRole)

/**
 * @openapi
 * /api/roles/:
 *   get:
 *     description: voir tous les roles
 *     tags: [Gestion des roles]
 *     responses:
 *       200:
 *         description: ...
 *       400:
 *         description: error
 *       401:
 *         description: Unauthorized, vous n'êtes pas connecté
 *
 */

router.get('', authentication, authorization, getRoles)

/**
 * @openapi
 * /api/roles/:id:
 *   patch:
 *     description: Mettre à jour un role
 *     tags: [Gestion des roles]
 *     parameters:
 *       - name: roleName
 *         description: Nom du role
 *         schema:
 *           type: string
 *         required: true
 *       - name: POST api/users/signup
 *         description: Authorisation pour la requete POST sur 'api/users/signup'
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: Le role a été modifié !
 *       401:
 *         description: Unauthorized, vous n'êtes pas connecté
 */
router.patch('/:id', authentication, authorization, updateRole)

/**
 * @openapi
 * /api/roles/:id:
 *   delete:
 *     description: Effacer un role
 *     tags: [Gestion des roles]
 *     responses:
 *       200:
 *         description: Un role a été supprimé !
 *       400:
 *         description: ...
 *       401:
 *         description: Unauthorized, vous n'êtes pas connecté
 */
router.delete('/:id', authentication, authorization, deleteRole)

export default router
