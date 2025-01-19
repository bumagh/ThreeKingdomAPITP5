<?php

namespace app\common\model;

use think\Model;

class SoldierModel extends BaseModel
{
    //
    protected $table = 'soldier';
    public function getListByCharacterId($id)
    {
        return $this->where([
            ['character_id', '=', $id],
        ])->field('*')->select();
    }
}
