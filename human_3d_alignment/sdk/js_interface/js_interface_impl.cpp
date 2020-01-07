
#include <emscripten.h>

extern "C" {

// Not using size_t for array indices as the values used by the javascript code are signed.
void array_bounds_check(const int array_size, const int array_idx) {
  if (array_idx < 0 || array_idx >= array_size) {
    EM_ASM({
      throw 'Array index ' + $0 + ' out of bounds: [0,' + $1 + ')';
    }, array_idx, array_size);
  }
}

// MutableParamList

void EMSCRIPTEN_KEEPALIVE emscripten_bind_MutableParamList___destroy___0(MutableParamList* self) {
  delete self;
}

// SList

SList* EMSCRIPTEN_KEEPALIVE emscripten_bind_SList_SList_0() {
  return new SList();
}

void* EMSCRIPTEN_KEEPALIVE emscripten_bind_SList_get_1(SList* self, int arg0) {
  return self->get(arg0);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_SList_size_0(SList* self) {
  return self->size();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_SList___destroy___0(SList* self) {
  delete self;
}

// MultiMap

MultiMap* EMSCRIPTEN_KEEPALIVE emscripten_bind_MultiMap_MultiMap_0() {
  return new MultiMap();
}

SingleMapping* EMSCRIPTEN_KEEPALIVE emscripten_bind_MultiMap_getMapping_1(MultiMap* self, int arg0) {
  return self->getMapping(arg0);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_MultiMap_rangeCount_0(MultiMap* self) {
  return self->rangeCount();
}

MultiRange* EMSCRIPTEN_KEEPALIVE emscripten_bind_MultiMap_map_1(MultiMap* self, MultiRange* arg0) {
  static MultiRange temp;
  return (temp = self->map(*arg0), &temp);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_MultiMap_addCombined_2(MultiMap* self, const MultiMap* arg0, const MultiMap* arg1) {
  self->addCombined(*arg0, *arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_MultiMap_addReversed_1(MultiMap* self, const MultiMap* arg0) {
  self->addReversed(*arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_MultiMap___destroy___0(MultiMap* self) {
  delete self;
}

// GlyphLoader

GlyphLoader* EMSCRIPTEN_KEEPALIVE emscripten_bind_GlyphLoader_GlyphLoader_0() {
  return new GlyphLoader();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_GlyphLoader_getStringifiedGlyph_1(GlyphLoader* self, NeuroClass* arg0) {
  return self->getStringifiedGlyph(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GlyphLoader___destroy___0(GlyphLoader* self) {
  delete self;
}

// LoggerToMemory

LoggerToMemory* EMSCRIPTEN_KEEPALIVE emscripten_bind_LoggerToMemory_LoggerToMemory_1(int arg0) {
  return new LoggerToMemory(arg0);
}

LoggerToMemory* EMSCRIPTEN_KEEPALIVE emscripten_bind_LoggerToMemory_LoggerToMemory_2(int arg0, int arg1) {
  return new LoggerToMemory(arg0, arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_LoggerToMemory_reset_0(LoggerToMemory* self) {
  self->reset();
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_LoggerToMemory_getErrorCount_0(LoggerToMemory* self) {
  return self->getErrorCount();
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_LoggerToMemory_getWarningCount_0(LoggerToMemory* self) {
  return self->getWarningCount();
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_LoggerToMemory_getInfoCount_0(LoggerToMemory* self) {
  return self->getInfoCount();
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_LoggerToMemory_getStoredCount_0(LoggerToMemory* self) {
  return self->getStoredCount();
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_LoggerToMemory_getErrorLevel_0(LoggerToMemory* self) {
  return self->getErrorLevel();
}

string* EMSCRIPTEN_KEEPALIVE emscripten_bind_LoggerToMemory_getMessages_0(LoggerToMemory* self) {
  static string temp;
  return (temp = self->getMessages(), &temp);
}

string* EMSCRIPTEN_KEEPALIVE emscripten_bind_LoggerToMemory_getCountSummary_0(LoggerToMemory* self) {
  static string temp;
  return (temp = self->getCountSummary(), &temp);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_LoggerToMemory_handle_4(LoggerToMemory* self, const char* arg0, const char* arg1, int arg2, const char* arg3) {
  self->handle(arg0, arg1, arg2, arg3);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_LoggerToMemory___destroy___0(LoggerToMemory* self) {
  delete self;
}

// ParamTree

ParamTree::ParamTreeNode* EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamTree_addNode_3(ParamTree* self, ParamTree::ParamTreeNode* arg0, const string* arg1, int arg2) {
  return self->addNode(arg0, *arg1, arg2);
}

ParamTree::ParamTreeNode* EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamTree_findNode_2(ParamTree* self, ParamTree::ParamTreeNode* arg0, const string* arg1) {
  return self->findNode(arg0, *arg1);
}

ParamTree* EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamTree_ParamTree_1(ParamInterface* arg0) {
  return new ParamTree(arg0);
}

ParamTree::ParamTreeNode* EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamTree_get_root_0(ParamTree* self) {
  return &self->root;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamTree_set_root_1(ParamTree* self, ParamTree::ParamTreeNode* arg0) {
  self->root = *arg0;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamTree___destroy___0(ParamTree* self) {
  delete self;
}

// GenoOper_fF

GenoOper_fF* EMSCRIPTEN_KEEPALIVE emscripten_bind_GenoOper_fF_GenoOper_fF_0() {
  return new GenoOper_fF();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GenoOper_fF___destroy___0(GenoOper_fF* self) {
  delete self;
}

// Param

Param* EMSCRIPTEN_KEEPALIVE emscripten_bind_Param_Param_2(ParamEntry* arg0, void* arg1) {
  return new Param(arg0, arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Param___destroy___0(Param* self) {
  delete self;
}

// IRange

int EMSCRIPTEN_KEEPALIVE emscripten_bind_IRange_get_begin_0(IRange* self) {
  return self->begin;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_IRange_set_begin_1(IRange* self, int arg0) {
  self->begin = arg0;
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_IRange_get_end_0(IRange* self) {
  return self->end;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_IRange_set_end_1(IRange* self, int arg0) {
  self->end = arg0;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_IRange___destroy___0(IRange* self) {
  delete self;
}

// Geno_fB

Geno_fB* EMSCRIPTEN_KEEPALIVE emscripten_bind_Geno_fB_Geno_fB_0() {
  return new Geno_fB();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Geno_fB___destroy___0(Geno_fB* self) {
  delete self;
}

// Geno_fL

Geno_fL* EMSCRIPTEN_KEEPALIVE emscripten_bind_Geno_fL_Geno_fL_0() {
  return new Geno_fL();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Geno_fL___destroy___0(Geno_fL* self) {
  delete self;
}

// VoidPtr

void EMSCRIPTEN_KEEPALIVE emscripten_bind_VoidPtr___destroy___0(void** self) {
  delete self;
}

// GenoValidator

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GenoValidator___destroy___0(GenoValidator* self) {
  delete self;
}

// Geno_fH

Geno_fH* EMSCRIPTEN_KEEPALIVE emscripten_bind_Geno_fH_Geno_fH_0() {
  return new Geno_fH();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Geno_fH___destroy___0(Geno_fH* self) {
  delete self;
}

// ParamEntry

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamEntry___destroy___0(ParamEntry* self) {
  delete self;
}

// SingleMapping

int EMSCRIPTEN_KEEPALIVE emscripten_bind_SingleMapping_get_begin_0(SingleMapping* self) {
  return self->begin;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_SingleMapping_set_begin_1(SingleMapping* self, int arg0) {
  self->begin = arg0;
}

MultiRange* EMSCRIPTEN_KEEPALIVE emscripten_bind_SingleMapping_get_to_0(SingleMapping* self) {
  return &self->to;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_SingleMapping_set_to_1(SingleMapping* self, MultiRange* arg0) {
  self->to = *arg0;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_SingleMapping___destroy___0(SingleMapping* self) {
  delete self;
}

// GenMan

GenMan* EMSCRIPTEN_KEEPALIVE emscripten_bind_GenMan_GenMan_0() {
  return new GenMan();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GenMan_setDefaults_0(GenMan* self) {
  self->setDefaults();
}

string* EMSCRIPTEN_KEEPALIVE emscripten_bind_GenMan_HTMLize_1(GenMan* self, const char* arg0) {
  static string temp;
  return (temp = self->HTMLize(arg0), &temp);
}

string* EMSCRIPTEN_KEEPALIVE emscripten_bind_GenMan_HTMLizeShort_1(GenMan* self, const char* arg0) {
  static string temp;
  return (temp = self->HTMLizeShort(arg0), &temp);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GenMan___destroy___0(GenMan* self) {
  delete self;
}

// ModelGenoValidator

ModelGenoValidator* EMSCRIPTEN_KEEPALIVE emscripten_bind_ModelGenoValidator_ModelGenoValidator_0() {
  return new ModelGenoValidator();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ModelGenoValidator___destroy___0(ModelGenoValidator* self) {
  delete self;
}

// ParamInterface

int EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamInterface_getGroupCount_0(ParamInterface* self) {
  return self->getGroupCount();
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamInterface_getPropCount_0(ParamInterface* self) {
  return self->getPropCount();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamInterface_getName_0(ParamInterface* self) {
  return self->getName();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamInterface_getDescription_0(ParamInterface* self) {
  return self->getDescription();
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamInterface_findId_1(ParamInterface* self, const char* arg0) {
  return self->findId(arg0);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamInterface_findIdn_2(ParamInterface* self, const char* arg0, int arg1) {
  return self->findIdn(arg0, arg1);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamInterface_type_1(ParamInterface* self, int arg0) {
  return self->type(arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamInterface_help_1(ParamInterface* self, int arg0) {
  return self->help(arg0);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamInterface_flags_1(ParamInterface* self, int arg0) {
  return self->flags(arg0);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamInterface_group_1(ParamInterface* self, int arg0) {
  return self->group(arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamInterface_grname_1(ParamInterface* self, int arg0) {
  return self->grname(arg0);
}

SString* EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamInterface_get_1(ParamInterface* self, int arg0) {
  static SString temp;
  return (temp = self->get(arg0), &temp);
}

SString* EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamInterface_getString_1(ParamInterface* self, int arg0) {
  static SString temp;
  return (temp = self->getString(arg0), &temp);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamInterface_getInt_1(ParamInterface* self, int arg0) {
  return self->getInt(arg0);
}

double EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamInterface_getDouble_1(ParamInterface* self, int arg0) {
  return self->getDouble(arg0);
}

SString* EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamInterface_getStringById_1(ParamInterface* self, const char* arg0) {
  static SString temp;
  return (temp = self->getStringById(arg0), &temp);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamInterface_getIntById_1(ParamInterface* self, const char* arg0) {
  return self->getIntById(arg0);
}

double EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamInterface_getDoubleById_1(ParamInterface* self, const char* arg0) {
  return self->getDoubleById(arg0);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamInterface_setIntFromString_3(ParamInterface* self, int arg0, const char* arg1, bool arg2) {
  return self->setIntFromString(arg0, arg1, arg2);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamInterface_setDoubleFromString_2(ParamInterface* self, int arg0, const char* arg1) {
  return self->setDoubleFromString(arg0, arg1);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamInterface_setInt_2(ParamInterface* self, int arg0, int arg1) {
  return self->setInt(arg0, arg1);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamInterface_setDouble_2(ParamInterface* self, int arg0, double arg1) {
  return self->setDouble(arg0, arg1);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamInterface_setString_2(ParamInterface* self, int arg0, const SString* arg1) {
  return self->setString(arg0, *arg1);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamInterface_setFromString_3(ParamInterface* self, int arg0, const char* arg1, bool arg2) {
  return self->setFromString(arg0, arg1, arg2);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamInterface_setIntById_2(ParamInterface* self, const char* arg0, int arg1) {
  return self->setIntById(arg0, arg1);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamInterface_setDoubleById_2(ParamInterface* self, const char* arg0, double arg1) {
  return self->setDoubleById(arg0, arg1);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamInterface_setStringById_2(ParamInterface* self, const char* arg0, const char* arg1) {
  return self->setStringById(arg0, arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamInterface_setDefault_0(ParamInterface* self) {
  self->setDefault();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamInterface_setDefault_1(ParamInterface* self, int arg0) {
  self->setDefault(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamInterface_setMin_0(ParamInterface* self) {
  self->setMin();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamInterface_setMin_1(ParamInterface* self, int arg0) {
  self->setMin(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamInterface_setMax_0(ParamInterface* self) {
  self->setMax();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamInterface_setMax_1(ParamInterface* self, int arg0) {
  self->setMax(arg0);
}

SString* EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamInterface_friendlyTypeDescrFromTypeDef_1(ParamInterface* self, const char* arg0) {
  static SString temp;
  return (temp = self->friendlyTypeDescrFromTypeDef(arg0), &temp);
}

SString* EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamInterface_friendlyTypeDescr_1(ParamInterface* self, int arg0) {
  static SString temp;
  return (temp = self->friendlyTypeDescr(arg0), &temp);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamInterface_copyFrom_1(ParamInterface* self, ParamInterface* arg0) {
  self->copyFrom(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamInterface_quickCopyFrom_1(ParamInterface* self, ParamInterface* arg0) {
  self->quickCopyFrom(arg0);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamInterface_isValidTypeDescription_1(ParamInterface* self, const char* arg0) {
  return self->isValidTypeDescription(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamInterface___destroy___0(ParamInterface* self) {
  delete self;
}

// NeuroClass

NeuroClass* EMSCRIPTEN_KEEPALIVE emscripten_bind_NeuroClass_NeuroClass_0() {
  return new NeuroClass();
}

const SString* EMSCRIPTEN_KEEPALIVE emscripten_bind_NeuroClass_getName_0(NeuroClass* self) {
  return &self->getName();
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_NeuroClass_getVisualHints_0(NeuroClass* self) {
  return self->getVisualHints();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_NeuroClass___destroy___0(NeuroClass* self) {
  delete self;
}

// NNLayoutFunctionHelper

NNLayoutFunctionHelper* EMSCRIPTEN_KEEPALIVE emscripten_bind_NNLayoutFunctionHelper_NNLayoutFunctionHelper_0() {
  return new NNLayoutFunctionHelper();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_NNLayoutFunctionHelper_doLayout_2(NNLayoutFunctionHelper* self, int arg0, NNLayoutState* arg1) {
  self->doLayout(arg0, arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_NNLayoutFunctionHelper___destroy___0(NNLayoutFunctionHelper* self) {
  delete self;
}

// Joint

Joint* EMSCRIPTEN_KEEPALIVE emscripten_bind_Joint_Joint_0() {
  return new Joint();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Joint_attachToParts_2(Joint* self, Part* arg0, Part* arg1) {
  self->attachToParts(arg0, arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Joint_resetDelta_0(Joint* self) {
  self->resetDelta();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Joint_useDelta_1(Joint* self, bool arg0) {
  self->useDelta(arg0);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_Joint_isDelta_0(Joint* self) {
  return self->isDelta();
}

MultiRange* EMSCRIPTEN_KEEPALIVE emscripten_bind_Joint_getMapping_0(Joint* self) {
  return self->getMapping();
}

Part* EMSCRIPTEN_KEEPALIVE emscripten_bind_Joint_get_part1_0(Joint* self) {
  return self->part1;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Joint_set_part1_1(Joint* self, Part* arg0) {
  self->part1 = arg0;
}

Part* EMSCRIPTEN_KEEPALIVE emscripten_bind_Joint_get_part2_0(Joint* self) {
  return self->part2;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Joint_set_part2_1(Joint* self, Part* arg0) {
  self->part2 = arg0;
}

Pt3D* EMSCRIPTEN_KEEPALIVE emscripten_bind_Joint_get_d_0(Joint* self) {
  return &self->d;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Joint_set_d_1(Joint* self, Pt3D* arg0) {
  self->d = *arg0;
}

Pt3D* EMSCRIPTEN_KEEPALIVE emscripten_bind_Joint_get_rot_0(Joint* self) {
  return &self->rot;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Joint_set_rot_1(Joint* self, Pt3D* arg0) {
  self->rot = *arg0;
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Joint_get_refno_0(Joint* self) {
  return self->refno;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Joint_set_refno_1(Joint* self, int arg0) {
  self->refno = arg0;
}

double EMSCRIPTEN_KEEPALIVE emscripten_bind_Joint_get_stamina_0(Joint* self) {
  return self->stamina;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Joint_set_stamina_1(Joint* self, double arg0) {
  self->stamina = arg0;
}

double EMSCRIPTEN_KEEPALIVE emscripten_bind_Joint_get_stif_0(Joint* self) {
  return self->stif;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Joint_set_stif_1(Joint* self, double arg0) {
  self->stif = arg0;
}

double EMSCRIPTEN_KEEPALIVE emscripten_bind_Joint_get_rotstif_0(Joint* self) {
  return self->rotstif;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Joint_set_rotstif_1(Joint* self, double arg0) {
  self->rotstif = arg0;
}

Orient* EMSCRIPTEN_KEEPALIVE emscripten_bind_Joint_get_o_0(Joint* self) {
  return &self->o;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Joint_set_o_1(Joint* self, Orient* arg0) {
  self->o = *arg0;
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_Joint_get_usedelta_0(Joint* self) {
  return self->usedelta;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Joint_set_usedelta_1(Joint* self, bool arg0) {
  self->usedelta = arg0;
}

Pt3D* EMSCRIPTEN_KEEPALIVE emscripten_bind_Joint_get_vcolor_0(Joint* self) {
  return &self->vcolor;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Joint_set_vcolor_1(Joint* self, Pt3D* arg0) {
  self->vcolor = *arg0;
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Joint_get_shape_0(Joint* self) {
  return self->shape;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Joint_set_shape_1(Joint* self, int arg0) {
  self->shape = arg0;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Joint___destroy___0(Joint* self) {
  delete self;
}

// Part

Part* EMSCRIPTEN_KEEPALIVE emscripten_bind_Part_Part_0() {
  return new Part();
}

Part* EMSCRIPTEN_KEEPALIVE emscripten_bind_Part_Part_1(Part_Shape arg0) {
  return new Part(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Part_setPositionAndRotationFromAxis_2(Part* self, const Pt3D* arg0, const Pt3D* arg1) {
  self->setPositionAndRotationFromAxis(*arg0, *arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Part_setOrient_1(Part* self, const Orient* arg0) {
  self->setOrient(*arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Part_setRot_1(Part* self, const Pt3D* arg0) {
  self->setRot(*arg0);
}

MultiRange* EMSCRIPTEN_KEEPALIVE emscripten_bind_Part_getMapping_0(Part* self) {
  return self->getMapping();
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Part_get_refno_0(Part* self) {
  return self->refno;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Part_set_refno_1(Part* self, int arg0) {
  self->refno = arg0;
}

Pt3D* EMSCRIPTEN_KEEPALIVE emscripten_bind_Part_get_p_0(Part* self) {
  return &self->p;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Part_set_p_1(Part* self, Pt3D* arg0) {
  self->p = *arg0;
}

Orient* EMSCRIPTEN_KEEPALIVE emscripten_bind_Part_get_o_0(Part* self) {
  return &self->o;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Part_set_o_1(Part* self, Orient* arg0) {
  self->o = *arg0;
}

Pt3D* EMSCRIPTEN_KEEPALIVE emscripten_bind_Part_get_rot_0(Part* self) {
  return &self->rot;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Part_set_rot_1(Part* self, Pt3D* arg0) {
  self->rot = *arg0;
}

double EMSCRIPTEN_KEEPALIVE emscripten_bind_Part_get_mass_0(Part* self) {
  return self->mass;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Part_set_mass_1(Part* self, double arg0) {
  self->mass = arg0;
}

double EMSCRIPTEN_KEEPALIVE emscripten_bind_Part_get_size_0(Part* self) {
  return self->size;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Part_set_size_1(Part* self, double arg0) {
  self->size = arg0;
}

double EMSCRIPTEN_KEEPALIVE emscripten_bind_Part_get_density_0(Part* self) {
  return self->density;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Part_set_density_1(Part* self, double arg0) {
  self->density = arg0;
}

double EMSCRIPTEN_KEEPALIVE emscripten_bind_Part_get_friction_0(Part* self) {
  return self->friction;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Part_set_friction_1(Part* self, double arg0) {
  self->friction = arg0;
}

double EMSCRIPTEN_KEEPALIVE emscripten_bind_Part_get_ingest_0(Part* self) {
  return self->ingest;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Part_set_ingest_1(Part* self, double arg0) {
  self->ingest = arg0;
}

double EMSCRIPTEN_KEEPALIVE emscripten_bind_Part_get_assim_0(Part* self) {
  return self->assim;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Part_set_assim_1(Part* self, double arg0) {
  self->assim = arg0;
}

double EMSCRIPTEN_KEEPALIVE emscripten_bind_Part_get_hollow_0(Part* self) {
  return self->hollow;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Part_set_hollow_1(Part* self, double arg0) {
  self->hollow = arg0;
}

Pt3D* EMSCRIPTEN_KEEPALIVE emscripten_bind_Part_get_scale_0(Part* self) {
  return &self->scale;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Part_set_scale_1(Part* self, Pt3D* arg0) {
  self->scale = *arg0;
}

Pt3D* EMSCRIPTEN_KEEPALIVE emscripten_bind_Part_get_vcolor_0(Part* self) {
  return &self->vcolor;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Part_set_vcolor_1(Part* self, Pt3D* arg0) {
  self->vcolor = *arg0;
}

double EMSCRIPTEN_KEEPALIVE emscripten_bind_Part_get_vsize_0(Part* self) {
  return self->vsize;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Part_set_vsize_1(Part* self, double arg0) {
  self->vsize = arg0;
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Part_get_shape_0(Part* self) {
  return self->shape;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Part_set_shape_1(Part* self, int arg0) {
  self->shape = arg0;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Part___destroy___0(Part* self) {
  delete self;
}

// NNLayoutState_Model

void EMSCRIPTEN_KEEPALIVE emscripten_bind_NNLayoutState_Model___destroy___0(NNLayoutState_Model* self) {
  delete self;
}

// NodePtr

ParamTree::ParamTreeNode* EMSCRIPTEN_KEEPALIVE emscripten_bind_NodePtr_get_0(ParamTree::NodePtr* self) {
  return self->get();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_NodePtr___destroy___0(ParamTree::NodePtr* self) {
  delete self;
}

// ParamTreeNode

ParamTree* EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamTreeNode_get_tree_0(ParamTree::ParamTreeNode* self) {
  return self->tree;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamTreeNode_set_tree_1(ParamTree::ParamTreeNode* self, ParamTree* arg0) {
  self->tree = arg0;
}

ParamTree::ParamTreeNode* EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamTreeNode_get_parent_0(ParamTree::ParamTreeNode* self) {
  return self->parent;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamTreeNode_set_parent_1(ParamTree::ParamTreeNode* self, ParamTree::ParamTreeNode* arg0) {
  self->parent = arg0;
}

string* EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamTreeNode_get_name_0(ParamTree::ParamTreeNode* self) {
  return &self->name;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamTreeNode_set_name_1(ParamTree::ParamTreeNode* self, string* arg0) {
  self->name = *arg0;
}

ParamTree::NodePtr* EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamTreeNode_get_first_child_0(ParamTree::ParamTreeNode* self) {
  return &self->first_child;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamTreeNode_set_first_child_1(ParamTree::ParamTreeNode* self, ParamTree::NodePtr* arg0) {
  self->first_child = *arg0;
}

ParamTree::NodePtr* EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamTreeNode_get_next_sibling_0(ParamTree::ParamTreeNode* self) {
  return &self->next_sibling;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamTreeNode_set_next_sibling_1(ParamTree::ParamTreeNode* self, ParamTree::NodePtr* arg0) {
  self->next_sibling = *arg0;
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamTreeNode_get_group_index_0(ParamTree::ParamTreeNode* self) {
  return self->group_index;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamTreeNode_set_group_index_1(ParamTree::ParamTreeNode* self, int arg0) {
  self->group_index = arg0;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamTreeNode___destroy___0(ParamTree::ParamTreeNode* self) {
  delete self;
}

// GenoOperatorsHelper

GenoOperatorsHelper* EMSCRIPTEN_KEEPALIVE emscripten_bind_GenoOperatorsHelper_GenoOperatorsHelper_1(GenoOperators* arg0) {
  return new GenoOperatorsHelper(arg0);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_GenoOperatorsHelper_mutate_1(GenoOperatorsHelper* self, const char* arg0) {
  return self->mutate(arg0);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_GenoOperatorsHelper_crossOver_2(GenoOperatorsHelper* self, const char* arg0, const char* arg1) {
  return self->crossOver(arg0, arg1);
}

SString* EMSCRIPTEN_KEEPALIVE emscripten_bind_GenoOperatorsHelper_getLastMutateGeno_0(GenoOperatorsHelper* self) {
  static SString temp;
  return (temp = self->getLastMutateGeno(), &temp);
}

SString* EMSCRIPTEN_KEEPALIVE emscripten_bind_GenoOperatorsHelper_getLastCrossGeno1_0(GenoOperatorsHelper* self) {
  static SString temp;
  return (temp = self->getLastCrossGeno1(), &temp);
}

SString* EMSCRIPTEN_KEEPALIVE emscripten_bind_GenoOperatorsHelper_getLastCrossGeno2_0(GenoOperatorsHelper* self) {
  static SString temp;
  return (temp = self->getLastCrossGeno2(), &temp);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GenoOperatorsHelper___destroy___0(GenoOperatorsHelper* self) {
  delete self;
}

// Pt3D

Pt3D* EMSCRIPTEN_KEEPALIVE emscripten_bind_Pt3D_Pt3D_0() {
  return new Pt3D();
}

double EMSCRIPTEN_KEEPALIVE emscripten_bind_Pt3D_get_x_0(Pt3D* self) {
  return self->x;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Pt3D_set_x_1(Pt3D* self, double arg0) {
  self->x = arg0;
}

double EMSCRIPTEN_KEEPALIVE emscripten_bind_Pt3D_get_y_0(Pt3D* self) {
  return self->y;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Pt3D_set_y_1(Pt3D* self, double arg0) {
  self->y = arg0;
}

double EMSCRIPTEN_KEEPALIVE emscripten_bind_Pt3D_get_z_0(Pt3D* self) {
  return self->z;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Pt3D_set_z_1(Pt3D* self, double arg0) {
  self->z = arg0;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Pt3D___destroy___0(Pt3D* self) {
  delete self;
}

// GenoOperators

GenoOperators* EMSCRIPTEN_KEEPALIVE emscripten_bind_GenoOperators_GenoOperators_0() {
  return new GenoOperators();
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_GenoOperators_checkValidity_2(GenoOperators* self, const char* arg0, const char* arg1) {
  return self->checkValidity(arg0, arg1);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_GenoOperators_validate_2(GenoOperators* self, char* arg0, const char* arg1) {
  return self->validate(arg0, arg1);
}

SString* EMSCRIPTEN_KEEPALIVE emscripten_bind_GenoOperators_getSimplest_0(GenoOperators* self) {
  static SString temp;
  return (temp = self->getSimplest(), &temp);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GenoOperators___destroy___0(GenoOperators* self) {
  delete self;
}

// Neuro

Neuro* EMSCRIPTEN_KEEPALIVE emscripten_bind_Neuro_Neuro_0() {
  return new Neuro();
}

Neuro* EMSCRIPTEN_KEEPALIVE emscripten_bind_Neuro_Neuro_4(double arg0, double arg1, double arg2, double arg3) {
  return new Neuro(arg0, arg1, arg2, arg3);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Neuro_setInputInfo_3(Neuro* self, int arg0, const SString* arg1, const SString* arg2) {
  self->setInputInfo(arg0, *arg1, *arg2);
}

SString* EMSCRIPTEN_KEEPALIVE emscripten_bind_Neuro_getInputInfo_1(Neuro* self, int arg0) {
  static SString temp;
  return (temp = self->getInputInfo(arg0), &temp);
}

SString* EMSCRIPTEN_KEEPALIVE emscripten_bind_Neuro_getInputInfo_2(Neuro* self, int arg0, const SString* arg1) {
  static SString temp;
  return (temp = self->getInputInfo(arg0, *arg1), &temp);
}

NeuroClass* EMSCRIPTEN_KEEPALIVE emscripten_bind_Neuro_getClass_0(Neuro* self) {
  return self->getClass();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Neuro_setClass_1(Neuro* self, NeuroClass* arg0) {
  self->setClass(arg0);
}

SString* EMSCRIPTEN_KEEPALIVE emscripten_bind_Neuro_getClassParams_0(Neuro* self) {
  static SString temp;
  return (temp = self->getClassParams(), &temp);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Neuro_setClassParams_1(Neuro* self, const SString* arg0) {
  self->setClassParams(*arg0);
}

SString* EMSCRIPTEN_KEEPALIVE emscripten_bind_Neuro_getClassName_0(Neuro* self) {
  static SString temp;
  return (temp = self->getClassName(), &temp);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Neuro_setClassName_1(Neuro* self, const SString* arg0) {
  self->setClassName(*arg0);
}

SString* EMSCRIPTEN_KEEPALIVE emscripten_bind_Neuro_getDetails_0(Neuro* self) {
  static SString temp;
  return (temp = self->getDetails(), &temp);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Neuro_setDetails_1(Neuro* self, const SString* arg0) {
  self->setDetails(*arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Neuro_attachToPart_1(Neuro* self, Part* arg0) {
  self->attachToPart(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Neuro_attachToJoint_1(Neuro* self, Joint* arg0) {
  self->attachToJoint(arg0);
}

Part* EMSCRIPTEN_KEEPALIVE emscripten_bind_Neuro_getPart_0(Neuro* self) {
  return self->getPart();
}

Joint* EMSCRIPTEN_KEEPALIVE emscripten_bind_Neuro_getJoint_0(Neuro* self) {
  return self->getJoint();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_Neuro_isOldEffector_0(Neuro* self) {
  return self->isOldEffector();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_Neuro_isOldReceptor_0(Neuro* self) {
  return self->isOldReceptor();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_Neuro_isOldNeuron_0(Neuro* self) {
  return self->isOldNeuron();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_Neuro_isNNConnection_0(Neuro* self) {
  return self->isNNConnection();
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Neuro_getInputCount_0(Neuro* self) {
  return self->getInputCount();
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Neuro_getOutputsCount_0(Neuro* self) {
  return self->getOutputsCount();
}

Neuro* EMSCRIPTEN_KEEPALIVE emscripten_bind_Neuro_getInput_1(Neuro* self, int arg0) {
  return self->getInput(arg0);
}

double EMSCRIPTEN_KEEPALIVE emscripten_bind_Neuro_getInputWeight_1(Neuro* self, int arg0) {
  return self->getInputWeight(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Neuro_setInputWeight_2(Neuro* self, int arg0, double arg1) {
  self->setInputWeight(arg0, arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Neuro_setInput_2(Neuro* self, int arg0, Neuro* arg1) {
  self->setInput(arg0, arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Neuro_setInput_3(Neuro* self, int arg0, Neuro* arg1, double arg2) {
  self->setInput(arg0, arg1, arg2);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Neuro_addInput_3(Neuro* self, Neuro* arg0, double arg1, const SString* arg2) {
  return self->addInput(arg0, arg1, arg2);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Neuro_findInput_1(Neuro* self, Neuro* arg0) {
  return self->findInput(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Neuro_removeInput_1(Neuro* self, int arg0) {
  self->removeInput(arg0);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Neuro_findInputs_4(Neuro* self, SList* arg0, const char* arg1, const Part* arg2, const Joint* arg3) {
  return self->findInputs(*arg0, arg1, arg2, arg3);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Neuro_findOutputs_4(Neuro* self, SList* arg0, const char* arg1, const Part* arg2, const Joint* arg3) {
  return self->findOutputs(*arg0, arg1, arg2, arg3);
}

MultiRange* EMSCRIPTEN_KEEPALIVE emscripten_bind_Neuro_getMapping_0(Neuro* self) {
  return self->getMapping();
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Neuro_get_refno_0(Neuro* self) {
  return self->refno;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Neuro_set_refno_1(Neuro* self, int arg0) {
  self->refno = arg0;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Neuro___destroy___0(Neuro* self) {
  delete self;
}

// string

string* EMSCRIPTEN_KEEPALIVE emscripten_bind_string_string_0() {
  return new string();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_string_c_str_0(string* self) {
  return self->c_str();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_string___destroy___0(string* self) {
  delete self;
}

// Geno_f4

Geno_f4* EMSCRIPTEN_KEEPALIVE emscripten_bind_Geno_f4_Geno_f4_0() {
  return new Geno_f4();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Geno_f4___destroy___0(Geno_f4* self) {
  delete self;
}

// StdioFileSystem_autoselect

StdioFileSystem_autoselect* EMSCRIPTEN_KEEPALIVE emscripten_bind_StdioFileSystem_autoselect_StdioFileSystem_autoselect_0() {
  return new StdioFileSystem_autoselect();
}

// GenoConvManager

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GenoConvManager___destroy___0(GenoConvManager* self) {
  delete self;
}

// NNLayoutState

void EMSCRIPTEN_KEEPALIVE emscripten_bind_NNLayoutState___destroy___0(NNLayoutState* self) {
  delete self;
}

// Geno

Geno* EMSCRIPTEN_KEEPALIVE emscripten_bind_Geno_Geno_0() {
  return new Geno();
}

Geno* EMSCRIPTEN_KEEPALIVE emscripten_bind_Geno_Geno_1(const SString* arg0) {
  return new Geno(*arg0);
}

Geno* EMSCRIPTEN_KEEPALIVE emscripten_bind_Geno_Geno_4(const char* arg0, char arg1, const char* arg2, const char* arg3) {
  return new Geno(arg0, arg1, arg2, arg3);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_Geno_isValid_0(Geno* self) {
  return self->isValid();
}

char EMSCRIPTEN_KEEPALIVE emscripten_bind_Geno_getFormat_0(Geno* self) {
  return self->getFormat();
}

SString* EMSCRIPTEN_KEEPALIVE emscripten_bind_Geno_getGenes_0(Geno* self) {
  static SString temp;
  return (temp = self->getGenes(), &temp);
}

Geno::Validators* EMSCRIPTEN_KEEPALIVE emscripten_bind_Geno_useValidators_1(Geno* self, Geno::Validators* arg0) {
  return self->useValidators(arg0);
}

GenoConvManager* EMSCRIPTEN_KEEPALIVE emscripten_bind_Geno_useConverters_1(Geno* self, GenoConvManager* arg0) {
  return self->useConverters(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Geno___destroy___0(Geno* self) {
  delete self;
}

// GenotypeMiniLoader

GenotypeMiniLoader* EMSCRIPTEN_KEEPALIVE emscripten_bind_GenotypeMiniLoader_GenotypeMiniLoader_1(const char* arg0) {
  return new GenotypeMiniLoader(arg0);
}

GenotypeMini* EMSCRIPTEN_KEEPALIVE emscripten_bind_GenotypeMiniLoader_loadNextGenotype_0(GenotypeMiniLoader* self) {
  return self->loadNextGenotype();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GenotypeMiniLoader___destroy___0(GenotypeMiniLoader* self) {
  delete self;
}

// Model

Model* EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_Model_0() {
  return new Model();
}

Model* EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_Model_1(const Geno* arg0) {
  return new Model(*arg0);
}

Model* EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_Model_2(const Geno* arg0, bool arg1) {
  return new Model(*arg0, arg1);
}

MultiMap* EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_getMap_0(Model* self) {
  static MultiMap temp;
  return (temp = self->getMap(), &temp);
}

const MultiMap* EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_getF0Map_0(Model* self) {
  static MultiMap temp;
  return (temp = self->getF0Map(), &temp);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_getCurrentToF0Map_1(Model* self, MultiMap* arg0) {
  self->getCurrentToF0Map(*arg0);
}

ModelBuildStatus EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_getStatus_0(Model* self) {
  return self->getStatus();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_isValid_0(Model* self) {
  return self->isValid();
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_getErrorPosition_1(Model* self, bool arg0) {
  return self->getErrorPosition(arg0);
}

Model_ShapeType EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_getShapeType_0(Model* self) {
  return self->getShapeType();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_updateRefno_0(Model* self) {
  self->updateRefno();
}

const Geno* EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_getF0Geno_0(Model* self) {
  static Geno temp;
  return (temp = self->getF0Geno(), &temp);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_makeGeno_1(Model* self, Geno* arg0) {
  self->makeGeno(*arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_setGeno_1(Model* self, const Geno* arg0) {
  self->setGeno(*arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_setValidationLevel_1(Model* self, int arg0) {
  self->setValidationLevel(arg0);
}

Pt3D* EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_whereDelta_3(Model* self, const Part* arg0, const Pt3D* arg1, const Pt3D* arg2) {
  static Pt3D temp;
  return (temp = self->whereDelta(*arg0, *arg1, *arg2), &temp);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_resetAllDelta_0(Model* self) {
  self->resetAllDelta();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_useAllDelta_1(Model* self, bool arg0) {
  self->useAllDelta(arg0);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_validate_0(Model* self) {
  return self->validate();
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_getPartCount_0(Model* self) {
  return self->getPartCount();
}

Part* EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_getPart_1(Model* self, int arg0) {
  return self->getPart(arg0);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_getJointCount_0(Model* self) {
  return self->getJointCount();
}

Joint* EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_getJoint_1(Model* self, int arg0) {
  return self->getJoint(arg0);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_getNeuroCount_0(Model* self) {
  return self->getNeuroCount();
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_getConnectionCount_0(Model* self) {
  return self->getConnectionCount();
}

Neuro* EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_getNeuro_1(Model* self, int arg0) {
  return self->getNeuro(arg0);
}

Part* EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_addPart_1(Model* self, Part* arg0) {
  return self->addPart(arg0);
}

Joint* EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_addJoint_1(Model* self, Joint* arg0) {
  return self->addJoint(arg0);
}

Neuro* EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_addNeuro_1(Model* self, Neuro* arg0) {
  return self->addNeuro(arg0);
}

Part* EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_addNewPart_1(Model* self, Part_Shape arg0) {
  return self->addNewPart(arg0);
}

Joint* EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_addNewJoint_3(Model* self, Part* arg0, Part* arg1, Joint_Shape arg2) {
  return self->addNewJoint(arg0, arg1, arg2);
}

Neuro* EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_addNewNeuro_0(Model* self) {
  return self->addNewNeuro();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_removePart_1(Model* self, int arg0) {
  self->removePart(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_removePart_2(Model* self, int arg0, int arg1) {
  self->removePart(arg0, arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_removePart_3(Model* self, int arg0, int arg1, int arg2) {
  self->removePart(arg0, arg1, arg2);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_removeJoint_1(Model* self, int arg0) {
  self->removeJoint(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_removeJoint_2(Model* self, int arg0, int arg1) {
  self->removeJoint(arg0, arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_removeNeuro_1(Model* self, int arg0) {
  self->removeNeuro(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_removeNeuro_2(Model* self, int arg0, bool arg1) {
  self->removeNeuro(arg0, arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_removeNeuros_1(Model* self, SList* arg0) {
  self->removeNeuros(*arg0);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_findPart_1(Model* self, Part* arg0) {
  return self->findPart(arg0);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_findJoint_1(Model* self, Joint* arg0) {
  return self->findJoint(arg0);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_findJoint_2(Model* self, Part* arg0, Part* arg1) {
  return self->findJoint(arg0, arg1);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_findNeuro_1(Model* self, Neuro* arg0) {
  return self->findNeuro(arg0);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_findNeuros_4(Model* self, SList* arg0, char* arg1, const Part* arg2, const Joint* arg3) {
  return self->findNeuros(*arg0, arg1, arg2, arg3);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_findJoints_2(Model* self, SList* arg0, const Part* arg1) {
  return self->findJoints(*arg0, arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_move_1(Model* self, const Pt3D* arg0) {
  self->move(*arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_rotate_1(Model* self, const Orient* arg0) {
  self->rotate(*arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_buildUsingSolidShapeTypes_1(Model* self, const Model* arg0) {
  self->buildUsingSolidShapeTypes(*arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_buildUsingSolidShapeTypes_2(Model* self, const Model* arg0, Part_Shape arg1) {
  self->buildUsingSolidShapeTypes(*arg0, arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_buildUsingSolidShapeTypes_3(Model* self, const Model* arg0, Part_Shape arg1, float arg2) {
  self->buildUsingSolidShapeTypes(*arg0, arg1, arg2);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_open_0(Model* self) {
  self->open();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_close_0(Model* self) {
  self->close();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_rebuild_1(Model* self, bool arg0) {
  self->rebuild(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_rebuild_2(Model* self, const Geno* arg0, bool arg1) {
  self->rebuild(*arg0, arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_clear_0(Model* self) {
  self->clear();
}

const Geno* EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_getGeno_0(Model* self) {
  static Geno temp;
  return (temp = self->getGeno(), &temp);
}

Pt3D* EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_get_size_0(Model* self) {
  return &self->size;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_set_size_1(Model* self, Pt3D* arg0) {
  self->size = *arg0;
}

SString* EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_get_vis_style_0(Model* self) {
  return &self->vis_style;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_set_vis_style_1(Model* self, SString* arg0) {
  self->vis_style = *arg0;
}

double EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_get_startenergy_0(Model* self) {
  return self->startenergy;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Model_set_startenergy_1(Model* self, double arg0) {
  self->startenergy = arg0;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Model___destroy___0(Model* self) {
  delete self;
}

// SaveFileHelper

SaveFileHelper* EMSCRIPTEN_KEEPALIVE emscripten_bind_SaveFileHelper_SaveFileHelper_0() {
  return new SaveFileHelper();
}

VirtFILE* EMSCRIPTEN_KEEPALIVE emscripten_bind_SaveFileHelper_Vfopen_2(SaveFileHelper* self, const char* arg0, const char* arg1) {
  return self->Vfopen(arg0, arg1);
}

ParamEntry* EMSCRIPTEN_KEEPALIVE emscripten_bind_SaveFileHelper_getMinigenotype_paramtab_0(SaveFileHelper* self) {
  return self->getMinigenotype_paramtab();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_SaveFileHelper___destroy___0(SaveFileHelper* self) {
  delete self;
}

// PreconfiguredGenetics

PreconfiguredGenetics* EMSCRIPTEN_KEEPALIVE emscripten_bind_PreconfiguredGenetics_PreconfiguredGenetics_0() {
  return new PreconfiguredGenetics();
}

DefaultGenoConvManager* EMSCRIPTEN_KEEPALIVE emscripten_bind_PreconfiguredGenetics_get_gcm_0(PreconfiguredGenetics* self) {
  return &self->gcm;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PreconfiguredGenetics_set_gcm_1(PreconfiguredGenetics* self, DefaultGenoConvManager* arg0) {
  self->gcm = *arg0;
}

GenMan* EMSCRIPTEN_KEEPALIVE emscripten_bind_PreconfiguredGenetics_get_genman_0(PreconfiguredGenetics* self) {
  return &self->genman;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PreconfiguredGenetics_set_genman_1(PreconfiguredGenetics* self, GenMan* arg0) {
  self->genman = *arg0;
}

Geno::Validators* EMSCRIPTEN_KEEPALIVE emscripten_bind_PreconfiguredGenetics_get_validators_0(PreconfiguredGenetics* self) {
  return &self->validators;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PreconfiguredGenetics_set_validators_1(PreconfiguredGenetics* self, Geno::Validators* arg0) {
  self->validators = *arg0;
}

ModelGenoValidator* EMSCRIPTEN_KEEPALIVE emscripten_bind_PreconfiguredGenetics_get_model_validator_0(PreconfiguredGenetics* self) {
  return &self->model_validator;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PreconfiguredGenetics_set_model_validator_1(PreconfiguredGenetics* self, ModelGenoValidator* arg0) {
  self->model_validator = *arg0;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PreconfiguredGenetics___destroy___0(PreconfiguredGenetics* self) {
  delete self;
}

// XYWH

XYWH* EMSCRIPTEN_KEEPALIVE emscripten_bind_XYWH_XYWH_4(int arg0, int arg1, int arg2, int arg3) {
  return new XYWH(arg0, arg1, arg2, arg3);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_XYWH_get_x_0(XYWH* self) {
  return self->x;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_XYWH_set_x_1(XYWH* self, int arg0) {
  self->x = arg0;
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_XYWH_get_y_0(XYWH* self) {
  return self->y;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_XYWH_set_y_1(XYWH* self, int arg0) {
  self->y = arg0;
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_XYWH_get_w_0(XYWH* self) {
  return self->w;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_XYWH_set_w_1(XYWH* self, int arg0) {
  self->w = arg0;
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_XYWH_get_h_0(XYWH* self) {
  return self->h;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_XYWH_set_h_1(XYWH* self, int arg0) {
  self->h = arg0;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_XYWH___destroy___0(XYWH* self) {
  delete self;
}

// LoggerBase

LoggerBase* EMSCRIPTEN_KEEPALIVE emscripten_bind_LoggerBase_LoggerBase_0() {
  return new LoggerBase();
}

LoggerBase* EMSCRIPTEN_KEEPALIVE emscripten_bind_LoggerBase_LoggerBase_1(int arg0) {
  return new LoggerBase(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_LoggerBase___destroy___0(LoggerBase* self) {
  delete self;
}

// GenotypeMini

GenotypeMini* EMSCRIPTEN_KEEPALIVE emscripten_bind_GenotypeMini_GenotypeMini_0() {
  return new GenotypeMini();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GenotypeMini_clear_0(GenotypeMini* self) {
  self->clear();
}

SString* EMSCRIPTEN_KEEPALIVE emscripten_bind_GenotypeMini_get_name_0(GenotypeMini* self) {
  return &self->name;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GenotypeMini_set_name_1(GenotypeMini* self, SString* arg0) {
  self->name = *arg0;
}

SString* EMSCRIPTEN_KEEPALIVE emscripten_bind_GenotypeMini_get_genotype_0(GenotypeMini* self) {
  return &self->genotype;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GenotypeMini_set_genotype_1(GenotypeMini* self, SString* arg0) {
  self->genotype = *arg0;
}

SString* EMSCRIPTEN_KEEPALIVE emscripten_bind_GenotypeMini_get_info_0(GenotypeMini* self) {
  return &self->info;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GenotypeMini_set_info_1(GenotypeMini* self, SString* arg0) {
  self->info = *arg0;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GenotypeMini___destroy___0(GenotypeMini* self) {
  delete self;
}

// GenoOper_f9

GenoOper_f9* EMSCRIPTEN_KEEPALIVE emscripten_bind_GenoOper_f9_GenoOper_f9_0() {
  return new GenoOper_f9();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GenoOper_f9___destroy___0(GenoOper_f9* self) {
  delete self;
}

// SString

SString* EMSCRIPTEN_KEEPALIVE emscripten_bind_SString_SString_0() {
  return new SString();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_SString_set_1(SString* self, const char* arg0) {
  (*self = arg0);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_SString_c_str_0(SString* self) {
  return self->c_str();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_SString___destroy___0(SString* self) {
  delete self;
}

// NNLayoutState_Model_Fred

NNLayoutState_Model_Fred* EMSCRIPTEN_KEEPALIVE emscripten_bind_NNLayoutState_Model_Fred_NNLayoutState_Model_Fred_1(Model* arg0) {
  return new NNLayoutState_Model_Fred(arg0);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_NNLayoutState_Model_Fred_GetElements_0(NNLayoutState_Model_Fred* self) {
  return self->GetElements();
}

XYWH* EMSCRIPTEN_KEEPALIVE emscripten_bind_NNLayoutState_Model_Fred_GetValueXYWH_1(NNLayoutState_Model_Fred* self, int arg0) {
  static XYWH temp;
  return (temp = self->GetValueXYWH(arg0), &temp);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_NNLayoutState_Model_Fred_SetXYWH_5(NNLayoutState_Model_Fred* self, int arg0, int arg1, int arg2, int arg3, int arg4) {
  self->SetXYWH(arg0, arg1, arg2, arg3, arg4);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_NNLayoutState_Model_Fred_GetInputs_1(NNLayoutState_Model_Fred* self, int arg0) {
  return self->GetInputs(arg0);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_NNLayoutState_Model_Fred_GetLink_2(NNLayoutState_Model_Fred* self, int arg0, int arg1) {
  return self->GetLink(arg0, arg1);
}

XY* EMSCRIPTEN_KEEPALIVE emscripten_bind_NNLayoutState_Model_Fred_GetLinkValueXY_2(NNLayoutState_Model_Fred* self, int arg0, int arg1) {
  static XY temp;
  return (temp = self->GetLinkValueXY(arg0, arg1), &temp);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_NNLayoutState_Model_Fred___destroy___0(NNLayoutState_Model_Fred* self) {
  delete self;
}

// ParamTreeConfigured

ParamTreeConfigured* EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamTreeConfigured_ParamTreeConfigured_0() {
  return new ParamTreeConfigured();
}

ParamTree* EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamTreeConfigured_generateTree_0(ParamTreeConfigured* self) {
  return self->generateTree();
}

ParamTree* EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamTreeConfigured_get_tree_0(ParamTreeConfigured* self) {
  return self->tree;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamTreeConfigured_set_tree_1(ParamTreeConfigured* self, ParamTree* arg0) {
  self->tree = arg0;
}

MutableParamList* EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamTreeConfigured_get_paramiface_0(ParamTreeConfigured* self) {
  return &self->paramiface;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamTreeConfigured_set_paramiface_1(ParamTreeConfigured* self, MutableParamList* arg0) {
  self->paramiface = *arg0;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ParamTreeConfigured___destroy___0(ParamTreeConfigured* self) {
  delete self;
}

// XY

XY* EMSCRIPTEN_KEEPALIVE emscripten_bind_XY_XY_2(int arg0, int arg1) {
  return new XY(arg0, arg1);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_XY_get_x_0(XY* self) {
  return self->x;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_XY_set_x_1(XY* self, int arg0) {
  self->x = arg0;
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_XY_get_y_0(XY* self) {
  return self->y;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_XY_set_y_1(XY* self, int arg0) {
  self->y = arg0;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_XY___destroy___0(XY* self) {
  delete self;
}

// Validators

Geno::Validators* EMSCRIPTEN_KEEPALIVE emscripten_bind_Validators_Validators_0() {
  return new Geno::Validators();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Validators_append_1(Geno::Validators* self, GenoValidator* arg0) {
  self->append(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Validators___destroy___0(Geno::Validators* self) {
  delete self;
}

// SimpleAbstractParam

void EMSCRIPTEN_KEEPALIVE emscripten_bind_SimpleAbstractParam___destroy___0(SimpleAbstractParam* self) {
  delete self;
}

// VirtFILE

void EMSCRIPTEN_KEEPALIVE emscripten_bind_VirtFILE___destroy___0(VirtFILE* self) {
  delete self;
}

// MultiRange

int EMSCRIPTEN_KEEPALIVE emscripten_bind_MultiRange_rangeCount_0(MultiRange* self) {
  return self->rangeCount();
}

IRange* EMSCRIPTEN_KEEPALIVE emscripten_bind_MultiRange_getRange_1(MultiRange* self, int arg0) {
  static IRange temp;
  return (temp = self->getRange(arg0), &temp);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_MultiRange___destroy___0(MultiRange* self) {
  delete self;
}

// Orient

Orient* EMSCRIPTEN_KEEPALIVE emscripten_bind_Orient_Orient_0() {
  return new Orient();
}

Orient* EMSCRIPTEN_KEEPALIVE emscripten_bind_Orient_Orient_3(const Pt3D* arg0, const Pt3D* arg1, const Pt3D* arg2) {
  return new Orient(*arg0, *arg1, *arg2);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Orient_rotate_1(Orient* self, const Pt3D* arg0) {
  self->rotate(*arg0);
}

Pt3D* EMSCRIPTEN_KEEPALIVE emscripten_bind_Orient_transform_1(Orient* self, const Pt3D* arg0) {
  static Pt3D temp;
  return (temp = self->transform(*arg0), &temp);
}

Pt3D* EMSCRIPTEN_KEEPALIVE emscripten_bind_Orient_revTransform_1(Orient* self, const Pt3D* arg0) {
  static Pt3D temp;
  return (temp = self->revTransform(*arg0), &temp);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Orient_transformSelf_1(Orient* self, const Orient* arg0) {
  self->transformSelf(*arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Orient_revTransformSelf_1(Orient* self, const Orient* arg0) {
  self->revTransformSelf(*arg0);
}

Pt3D* EMSCRIPTEN_KEEPALIVE emscripten_bind_Orient_getAngles_0(Orient* self) {
  static Pt3D temp;
  return (temp = self->getAngles(), &temp);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Orient_lookAt_2(Orient* self, const Pt3D* arg0, const Pt3D* arg1) {
  self->lookAt(*arg0, *arg1);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_Orient_normalize_0(Orient* self) {
  return self->normalize();
}

Pt3D* EMSCRIPTEN_KEEPALIVE emscripten_bind_Orient_get_x_0(Orient* self) {
  return &self->x;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Orient_set_x_1(Orient* self, Pt3D* arg0) {
  self->x = *arg0;
}

Pt3D* EMSCRIPTEN_KEEPALIVE emscripten_bind_Orient_get_y_0(Orient* self) {
  return &self->y;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Orient_set_y_1(Orient* self, Pt3D* arg0) {
  self->y = *arg0;
}

Pt3D* EMSCRIPTEN_KEEPALIVE emscripten_bind_Orient_get_z_0(Orient* self) {
  return &self->z;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Orient_set_z_1(Orient* self, Pt3D* arg0) {
  self->z = *arg0;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Orient___destroy___0(Orient* self) {
  delete self;
}

// DefaultGenoConvManager

DefaultGenoConvManager* EMSCRIPTEN_KEEPALIVE emscripten_bind_DefaultGenoConvManager_DefaultGenoConvManager_0() {
  return new DefaultGenoConvManager();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_DefaultGenoConvManager_addDefaultConverters_0(DefaultGenoConvManager* self) {
  self->addDefaultConverters();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_DefaultGenoConvManager___destroy___0(DefaultGenoConvManager* self) {
  delete self;
}

// Part_Shape
Part_Shape EMSCRIPTEN_KEEPALIVE emscripten_enum_Part_Shape_SHAPE_BALL_AND_STICK() {
  return Part::SHAPE_BALL_AND_STICK;
}
Part_Shape EMSCRIPTEN_KEEPALIVE emscripten_enum_Part_Shape_SHAPE_ELLIPSOID() {
  return Part::SHAPE_ELLIPSOID;
}
Part_Shape EMSCRIPTEN_KEEPALIVE emscripten_enum_Part_Shape_SHAPE_CUBOID() {
  return Part::SHAPE_CUBOID;
}
Part_Shape EMSCRIPTEN_KEEPALIVE emscripten_enum_Part_Shape_SHAPE_CYLINDER() {
  return Part::SHAPE_CYLINDER;
}

// NeuroClass_Hint
NeuroClass_Hint EMSCRIPTEN_KEEPALIVE emscripten_enum_NeuroClass_Hint_Invisible() {
  return NeuroClass::Invisible;
}
NeuroClass_Hint EMSCRIPTEN_KEEPALIVE emscripten_enum_NeuroClass_Hint_DontShowClass() {
  return NeuroClass::DontShowClass;
}
NeuroClass_Hint EMSCRIPTEN_KEEPALIVE emscripten_enum_NeuroClass_Hint_AtFirstPart() {
  return NeuroClass::AtFirstPart;
}
NeuroClass_Hint EMSCRIPTEN_KEEPALIVE emscripten_enum_NeuroClass_Hint_AtSecondPart() {
  return NeuroClass::AtSecondPart;
}
NeuroClass_Hint EMSCRIPTEN_KEEPALIVE emscripten_enum_NeuroClass_Hint_EffectorClass() {
  return NeuroClass::EffectorClass;
}
NeuroClass_Hint EMSCRIPTEN_KEEPALIVE emscripten_enum_NeuroClass_Hint_ReceptorClass() {
  return NeuroClass::ReceptorClass;
}
NeuroClass_Hint EMSCRIPTEN_KEEPALIVE emscripten_enum_NeuroClass_Hint_V1BendMuscle() {
  return NeuroClass::V1BendMuscle;
}
NeuroClass_Hint EMSCRIPTEN_KEEPALIVE emscripten_enum_NeuroClass_Hint_V1RotMuscle() {
  return NeuroClass::V1RotMuscle;
}
NeuroClass_Hint EMSCRIPTEN_KEEPALIVE emscripten_enum_NeuroClass_Hint_LinearMuscle() {
  return NeuroClass::LinearMuscle;
}

// LoggerToMemory_Options2
LoggerToMemory_Options2 EMSCRIPTEN_KEEPALIVE emscripten_enum_LoggerToMemory_Options2_StoreFirstMessage() {
  return LoggerToMemory::StoreFirstMessage;
}
LoggerToMemory_Options2 EMSCRIPTEN_KEEPALIVE emscripten_enum_LoggerToMemory_Options2_StoreAllMessages() {
  return LoggerToMemory::StoreAllMessages;
}

// LoggerBase_LoggerOptions
LoggerBase_LoggerOptions EMSCRIPTEN_KEEPALIVE emscripten_enum_LoggerBase_LoggerOptions_DontBlock() {
  return LoggerBase::DontBlock;
}
LoggerBase_LoggerOptions EMSCRIPTEN_KEEPALIVE emscripten_enum_LoggerBase_LoggerOptions_CannotBeBlocked() {
  return LoggerBase::CannotBeBlocked;
}
LoggerBase_LoggerOptions EMSCRIPTEN_KEEPALIVE emscripten_enum_LoggerBase_LoggerOptions_Enable() {
  return LoggerBase::Enable;
}
LoggerBase_LoggerOptions EMSCRIPTEN_KEEPALIVE emscripten_enum_LoggerBase_LoggerOptions_Paused() {
  return LoggerBase::Paused;
}

// Joint_Shape
Joint_Shape EMSCRIPTEN_KEEPALIVE emscripten_enum_Joint_Shape_SHAPE_BALL_AND_STICK() {
  return Joint::SHAPE_BALL_AND_STICK;
}
Joint_Shape EMSCRIPTEN_KEEPALIVE emscripten_enum_Joint_Shape_SHAPE_FIXED() {
  return Joint::SHAPE_FIXED;
}

// Model_ShapeType
Model_ShapeType EMSCRIPTEN_KEEPALIVE emscripten_enum_Model_ShapeType_SHAPE_UNKNOWN() {
  return Model::SHAPE_UNKNOWN;
}
Model_ShapeType EMSCRIPTEN_KEEPALIVE emscripten_enum_Model_ShapeType_SHAPE_ILLEGAL() {
  return Model::SHAPE_ILLEGAL;
}
Model_ShapeType EMSCRIPTEN_KEEPALIVE emscripten_enum_Model_ShapeType_SHAPE_BALL_AND_STICK() {
  return Model::SHAPE_BALL_AND_STICK;
}
Model_ShapeType EMSCRIPTEN_KEEPALIVE emscripten_enum_Model_ShapeType_SHAPE_SOLIDS() {
  return Model::SHAPE_SOLIDS;
}

// ModelBuildStatus
ModelBuildStatus EMSCRIPTEN_KEEPALIVE emscripten_enum_ModelBuildStatus_empty() {
  return empty;
}
ModelBuildStatus EMSCRIPTEN_KEEPALIVE emscripten_enum_ModelBuildStatus_building() {
  return building;
}
ModelBuildStatus EMSCRIPTEN_KEEPALIVE emscripten_enum_ModelBuildStatus_invalid() {
  return invalid;
}
ModelBuildStatus EMSCRIPTEN_KEEPALIVE emscripten_enum_ModelBuildStatus_valid() {
  return valid;
}

}

