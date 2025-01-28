<?php

namespace app\common\model;

use think\Model;

class TaskModel extends BaseModel
{
    //
    // protected $autoWriteTimestamp = 'datetime';
    protected $table = 'task';
    public function getListByCharacterId($id)
    {
        return $this->where([
            ['character_id', '=', $id]
        ])->field('character_id',true)->select();
    }

}
