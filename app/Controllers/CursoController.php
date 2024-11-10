<?php
namespace App\Controllers;

use App\Model\Curso;

class CursoController {

    public function desativarCurso($idCurso) {
        // Chama o Model para desativar o curso
        $cursoModel = new Curso();
        $disciplinaModel = new Disciplina();
    
        $cursoModel->atualizarEstadoCurso($idCurso, 0);
        
        // Chama o Model para desativar as disciplinas associadas
        $disciplinaModel->desativarDisciplinasPorCurso($idCurso);
    }



}